"""Regenerate the approved PDFs from the immutable pre-change Git objects.

Baseline PDFs: commit 7cb3d69ef1e96042c9dd1c5cf7adfb647d9dc8a5.
This keeps the original layout, links, fonts, and tagged structure while replacing
only the approved passages. Run from the repository root with bundled Python.
"""
from __future__ import annotations

from datetime import datetime, timezone
from io import BytesIO
import re
import subprocess
from pathlib import Path

from pypdf import PdfReader, PdfWriter
from pypdf.generic import (ArrayObject, ByteStringObject, ContentStream,
    DecodedStreamObject, DictionaryObject, FloatObject, NameObject, NumberObject)

BASE='7cb3d69ef1e96042c9dd1c5cf7adfb647d9dc8a5'
ROOT=Path(__file__).resolve().parents[1]
OUTPUT=ROOT/'public/downloads'

OG_PREDICTABLE='Predictable effect means having a reasoned expectation of what a change will do, not a guarantee. You bound the change, identify the effects to watch and the plausible downside, and retain the ability to respond when the evidence differs from your expectation.'
OG_BOUNDARY="A team boundary defines where people can decide and act; it must not cut them off from evidence. Customer and downstream feedback must reach the people doing the work. Management must connect affected groups and resolve decisions that exceed the team's authority."
OG_PAINTER='A painter starts on a water stain and finds a leaking pipe. The work revealed an underlying problem that painting could not solve. The leak exceeded the boundary of the original work and had to move to a boundary with the authority, knowledge, and ability to act on it.'
OG_QUESTION='Does evidence from the work change decisions, including yours?'


def baseline(path):
    return subprocess.check_output(['git','show',f'{BASE}:{path}'],cwd=ROOT)


def font_chars(page, font):
    f=page['/Resources']['/Font'][font].get_object()
    raw=f['/ToUnicode'].get_object().get_data().decode()
    mappings={}
    for section in re.findall(r'beginbfchar(.*?)endbfchar',raw,re.S):
        for a,b in re.findall(r'<([0-9A-F]+)>\s*<([0-9A-F]+)>',section):
            try:mappings[chr(int(b,16))]=int(a,16)
            except ValueError:pass
    widths=f['/Widths'];first=int(f['/FirstChar'])
    return mappings,{ch:float(widths[code-first]) for ch,code in mappings.items()}


def encoded(text, mapping):
    missing=set(text)-set(mapping)
    if missing:raise ValueError(f'Font misses {missing!r} in {text!r}')
    return ByteStringObject(bytes(mapping[ch] for ch in text))


def width(text, widths, size):
    return sum(widths[ch] for ch in text)*size/1000


def wrap(text,widths,size,max_width):
    lines=['']
    for word in text.split():
        trial=(lines[-1]+' '+word).strip()
        if lines[-1] and width(trial,widths,size)>max_width:lines.append(word)
        else:lines[-1]=trial
    return lines


def op(name,*args):return (list(args),name.encode())


def text_ops(x,y,text,font,size,mapping,color=(.14509804,.16862745,.16078431),stroke=False):
    ops=[op('q'),op('rg',*map(FloatObject,color))]
    if stroke:ops += [op('RG',*map(FloatObject,color)),op('w',FloatObject(.25))]
    ops += [op('BT'),op('Td',FloatObject(x),FloatObject(y)),op('Tf',NameObject(font),FloatObject(size))]
    if stroke:ops.append(op('Tr',NumberObject(2)))
    ops += [op('Tj',encoded(text,mapping)),op('ET'),op('Q')]
    return ops


def mcid_blocks(ops):
    result={}
    for i,(vals,kind) in enumerate(ops):
        if kind==b'BDC' and len(vals)>1 and isinstance(vals[1],DictionaryObject) and '/MCID' in vals[1]:
            mid=int(vals[1]['/MCID']);depth=1
            for j in range(i+1,len(ops)):
                if ops[j][1] in (b'BDC',b'BMC'):depth+=1
                elif ops[j][1]==b'EMC':
                    depth-=1
                    if depth==0:result[mid]=(i,j);break
    return result


def replace_block(ops,mid,inner):
    a,b=mcid_blocks(ops)[mid]
    ops[a+1:b]=inner


def shift_mcid_text(ops,from_mid,amount):
    for mid,(a,b) in mcid_blocks(ops).items():
        if mid<from_mid:continue
        for i in range(a+1,b):
            vals,kind=ops[i]
            if kind==b'Td' and len(vals)==2:
                vals[1]=FloatObject(float(vals[1])-amount)


def add_struct_paragraph(writer,page_index,after_mcid,new_mcid):
    root=writer._root_object['/StructTreeRoot'].get_object()
    nums=root['/ParentTree'].get_object()['/Nums']
    page=writer.pages[page_index]
    key=page['/StructParents']
    arr=next(nums[i+1].get_object() for i in range(0,len(nums),2) if nums[i]==key)
    prev_ref=arr[after_mcid];parent_ref=prev_ref.get_object()['/P'];parent=parent_ref.get_object()
    new=DictionaryObject({NameObject('/Type'):NameObject('/StructElem'),NameObject('/S'):NameObject('/Body'),NameObject('/P'):parent_ref,NameObject('/Pg'):page.indirect_reference,NameObject('/K'):ArrayObject([NumberObject(new_mcid)])})
    ref=writer._add_object(new)
    kids=parent['/K'];idx=next(i for i,x in enumerate(kids) if x==prev_ref);kids.insert(idx+1,ref)
    if len(arr)!=new_mcid:raise ValueError('Unexpected MCID count')
    arr.append(ref)


def add_question_row_struct(writer,page_index):
    root=writer._root_object['/StructTreeRoot'].get_object();nums=root['/ParentTree'].get_object()['/Nums'];page=writer.pages[page_index]
    arr=next(nums[i+1].get_object() for i in range(0,len(nums),2) if nums[i]==page['/StructParents'])
    if len(arr)!=17:raise ValueError('Unexpected question MCIDs')
    old_standard=arr[15].get_object();old_td=old_standard['/P'].get_object();old_tr=old_td['/P'].get_object();table_ref=old_tr['/P'];table=table_ref.get_object()
    tr=DictionaryObject({NameObject('/Type'):NameObject('/StructElem'),NameObject('/S'):NameObject('/TR'),NameObject('/P'):table_ref,NameObject('/Pg'):page.indirect_reference,NameObject('/K'):ArrayObject()})
    tr_ref=writer._add_object(tr)
    for mid in (17,18):
        td=DictionaryObject({NameObject('/Type'):NameObject('/StructElem'),NameObject('/S'):NameObject('/TD'),NameObject('/P'):tr_ref,NameObject('/Pg'):page.indirect_reference,NameObject('/K'):ArrayObject()})
        td_ref=writer._add_object(td)
        standard=DictionaryObject({NameObject('/Type'):NameObject('/StructElem'),NameObject('/S'):NameObject('/Standard'),NameObject('/P'):td_ref,NameObject('/Pg'):page.indirect_reference,NameObject('/K'):ArrayObject([NumberObject(mid)])})
        std_ref=writer._add_object(standard);td['/K'].append(std_ref);tr['/K'].append(td_ref);arr.append(std_ref)
    table['/K'].append(tr_ref)


def set_page_ops(writer,page_index,ops):
    stream=ContentStream(None,writer)
    stream.operations=ops
    new=DecodedStreamObject();new.set_data(stream.get_data())
    writer.pages[page_index].replace_contents(new)



def info_date(now):
    return now.strftime("D:%Y%m%d%H%M%SZ'")


def xmp_date(now):
    return now.isoformat(timespec='seconds').replace('+00:00','Z')


def replace_xmp(writer,xml):
    stream=DecodedStreamObject();stream.set_data(xml.encode('utf-8'))
    stream[NameObject('/Type')]=NameObject('/Metadata')
    stream[NameObject('/Subtype')]=NameObject('/XML')
    writer._root_object[NameObject('/Metadata')]=writer._add_object(stream)


def update_og_metadata(writer,reader,now):
    from uuid import uuid4
    from pypdf.generic import NullObject
    producer='pypdf 6.10.0 (source layout: LibreOffice 25.2.3.2)'
    old={str(k):str(v) for k,v in (reader.metadata or {}).items() if v is not None and not isinstance(v,NullObject)}
    old.update({'/ModDate':info_date(now),'/Creator':'3Back PDF regeneration script','/Producer':producer})
    writer.add_metadata(old)
    writer._info.get_object().pop(NameObject('/Trapped'),None)
    xmp=reader.trailer['/Root']['/Metadata'].get_object().get_data().decode('utf-8-sig')
    for tag,value in [('pdf:Producer',producer),('xmp:CreatorTool','3Back PDF regeneration script'),('xmp:ModifyDate',xmp_date(now)),('xmp:MetadataDate',xmp_date(now)),('xmpMM:InstanceID','uuid:'+str(uuid4()))]:
        xmp,count=re.subn(fr'<{tag}>.*?</{tag}>',f'<{tag}>{value}</{tag}>',xmp,count=1,flags=re.S)
        if count!=1:raise ValueError('Missing XMP field '+tag)
    replace_xmp(writer,xmp)


def add_learning_xmp(writer,reader,now,metadata):
    from uuid import uuid4,uuid5,NAMESPACE_URL
    from xml.sax.saxutils import escape
    root=writer._root_object
    from pypdf.generic import TextStringObject
    root[NameObject('/Lang')]=TextStringObject('en-US')
    title=escape(metadata['/Title']);description=escape(metadata['/Subject']);keywords=escape(metadata['/Keywords'])
    producer=escape(metadata['/Producer']);creator=escape(metadata['/Creator'])
    rights=escape(metadata['/Copyright']);url=escape(metadata['/Identifier']);source=escape(metadata['/Source'])
    terms=''.join('<rdf:li>'+escape(x.strip())+'</rdf:li>' for x in metadata['/Keywords'].split(';'))
    xml=f'''<?xpacket begin="\ufeff" id="W5M0MpCehiHzreSzNTczkc9d"?>
<x:xmpmeta xmlns:x="adobe:ns:meta/"><rdf:RDF xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"><rdf:Description rdf:about="" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:pdf="http://ns.adobe.com/pdf/1.3/" xmlns:xmp="http://ns.adobe.com/xap/1.0/" xmlns:xmpMM="http://ns.adobe.com/xap/1.0/mm/" xmlns:xmpRights="http://ns.adobe.com/xap/1.0/rights/">
<dc:format>application/pdf</dc:format><dc:title><rdf:Alt><rdf:li xml:lang="x-default">{title}</rdf:li></rdf:Alt></dc:title><dc:creator><rdf:Seq><rdf:li>3Back</rdf:li></rdf:Seq></dc:creator><dc:publisher><rdf:Bag><rdf:li>3Back</rdf:li></rdf:Bag></dc:publisher><dc:description><rdf:Alt><rdf:li xml:lang="x-default">{description}</rdf:li></rdf:Alt></dc:description><dc:subject><rdf:Bag>{terms}</rdf:Bag></dc:subject><dc:rights><rdf:Alt><rdf:li xml:lang="x-default">{rights}</rdf:li></rdf:Alt></dc:rights><dc:identifier>{url}</dc:identifier><dc:source>{source}</dc:source><pdf:Producer>{producer}</pdf:Producer><pdf:Keywords>{keywords}</pdf:Keywords><xmp:CreatorTool>{creator}</xmp:CreatorTool><xmp:CreateDate>2026-09-06T10:30:37-05:00</xmp:CreateDate><xmp:ModifyDate>{xmp_date(now)}</xmp:ModifyDate><xmp:MetadataDate>{xmp_date(now)}</xmp:MetadataDate><xmpMM:DocumentID>uuid:{uuid5(NAMESPACE_URL,metadata['/Identifier'])}</xmpMM:DocumentID><xmpMM:InstanceID>uuid:{uuid4()}</xmpMM:InstanceID><xmpRights:Marked>True</xmpRights:Marked><xmpRights:WebStatement>https://3back.com/</xmpRights:WebStatement><xmpRights:UsageTerms><rdf:Alt><rdf:li xml:lang="x-default">{rights}</rdf:li></rdf:Alt></xmpRights:UsageTerms>
</rdf:Description></rdf:RDF></x:xmpmeta>
<?xpacket end="w"?>'''
    replace_xmp(writer,xml)

def operational_grip():
    path='public/downloads/3Back-Operational-Grip-Executive-Brief.pdf'
    reader=PdfReader(BytesIO(baseline(path)));writer=PdfWriter();writer.clone_document_from_reader(reader)
    writer._header=b'%PDF-1.7'
    # Page 2: three approved lines and the preserved objective, with subsequent copy shifted one line.
    page=writer.pages[1];m4,w4=font_chars(page,'/F4');m2,_=font_chars(page,'/F2')
    lines=wrap(OG_PREDICTABLE,w4,10.5,508)
    if len(lines)!=3:raise ValueError('Unexpected Operational Grip paragraph reflow')
    c=ContentStream(page.get_contents(),writer);ops=c.operations
    for mid,line,y in zip((12,13,14),lines,(400,385.4,370.8)):replace_block(ops,mid,text_ops(51.95,y,line,'/F4',10.5,m4))
    first='The objective is not total understanding or centralized control. '
    bold='It is actionable control.'
    replace_block(ops,15,text_ops(51.95,348.2,first,'/F4',10.5,m4)+text_ops(51.95+width(first,w4,10.5),348.2,bold,'/F2',10.5,m2))
    shift_mcid_text(ops,16,22.6)
    shift_mcid_text(ops,28,18)
    for vals,kind in ops:
        if kind==b're' and len(vals)==4 and abs(float(vals[1])-148.35)<.01:vals[1]=FloatObject(107.75)
        if kind in (b'm',b'l') and len(vals)==2 and 148<float(vals[1])<215:vals[1]=FloatObject(float(vals[1])-40.6)
    set_page_ops(writer,1,ops)
    # Page 3: insert a tagged paragraph and move the four-condition grid and callout intact.
    page=writer.pages[2];m4,w4=font_chars(page,'/F4');lines=wrap(OG_BOUNDARY,w4,10.5,508)
    if len(lines)!=3:raise ValueError('Unexpected boundary paragraph reflow')
    add_struct_paragraph(writer,2,5,26)
    c=ContentStream(page.get_contents(),writer);ops=c.operations
    shift_mcid_text(ops,6,70)
    for vals,kind in ops:
        if kind==b're' and len(vals)==4 and 250<float(vals[1])<610:vals[1]=FloatObject(float(vals[1])-70)
        if kind in (b'm',b'l') and len(vals)==2 and 250<float(vals[1])<610:vals[1]=FloatObject(float(vals[1])-70)
    insert=mcid_blocks(ops)[5][1]+1
    para=[op('BDC',NameObject('/Body'),DictionaryObject({NameObject('/MCID'):NumberObject(26)}))]
    for line,y in zip(lines,(595,580.4,565.8)):para+=text_ops(51.95,y,line,'/F4',10.5,m4)
    para.append(op('EMC'));ops[insert:insert]=para
    set_page_ops(writer,2,ops)
    # Page 5: replace painter text and append a true fifth tagged table row.
    page=writer.pages[4];m4,w4=font_chars(page,'/F4');lines=wrap(OG_PAINTER,w4,10.5,508)
    if len(lines)!=3:raise ValueError('Unexpected painter paragraph reflow')
    add_question_row_struct(writer,4)
    c=ContentStream(page.get_contents(),writer);ops=c.operations
    for mid,line,y in zip((1,2,3),lines,(681.75,667.15,652.55)):replace_block(ops,mid,text_ops(51.95,y,line,'/F4',10.5,m4))
    # The existing row geometry is 52.5 points high; duplicate its two fills.
    row=[op('BMC',NameObject('/Artifact')),op('rg',FloatObject(.85098039),FloatObject(.41568627),FloatObject(.043137255)),op('re',FloatObject(62.3),FloatObject(229.45),FloatObject(37.35),FloatObject(37.75)),op('f*'),op('EMC'),op('BMC',NameObject('/Artifact')),op('rg',FloatObject(.96862745),FloatObject(.96078431),FloatObject(.9372549)),op('re',FloatObject(99.7),FloatObject(229.45),FloatObject(450.05),FloatObject(37.75)),op('f*'),op('EMC')]
    ops[mcid_blocks(ops)[0][0]:mcid_blocks(ops)[0][0]]=row
    new=[op('BDC',NameObject('/Standard'),DictionaryObject({NameObject('/MCID'):NumberObject(17)}))]+text_ops(77.3,250.1,'5','/F4',11.5,m4,color=(1,1,1),stroke=True)+[op('EMC')]
    new+=[op('BDC',NameObject('/Standard'),DictionaryObject({NameObject('/MCID'):NumberObject(18)}))]+text_ops(107.75,251.05,OG_QUESTION,'/F4',10.5,m4)+[op('EMC')]
    ops[mcid_blocks(ops)[16][1]+1:mcid_blocks(ops)[16][1]+1]=new
    set_page_ops(writer,4,ops)
    # Maintain accurate existing Info fields and the tagged document root.
    now=datetime.now(timezone.utc)
    update_og_metadata(writer,reader,now)
    out=OUTPUT/'3Back-Operational-Grip-Executive-Brief.pdf'
    with out.open('wb') as f:writer.write(f)
    print(out)

LEARNING_INSTRUCTOR=("The domain supplies the conditions, constraints, and evidence. Credible instruction must be grounded in expertise developed through doing the work. That expertise must remain open to correction by evidence from the domain. The instructor helps the learner examine their reasoning against evidence from the work and correct misunderstandings.")
LEARNING_CAPABILITY='Professional capability develops through repeated judgment and action in the domain, with evidence from the work correcting what the person understands and does next.'
LEARNING_QUESTION='Does evidence from the work change decisions, including yours?'
LEARNING_OBJECTIVES="The learning objectives establish the concepts and distinctions to be developed. The Practice Partner makes the learner's reasoning visible and open to challenge."
LEARNING_GUIDE=("Over time, people who develop this capability can become Domain Guides. They understand how work moves inside their organization, recognize where execution has lost grip, and help others learn through the same process. Courses provide structure. Practice Partners strengthen reasoning. Expert Echoes make inquiry continuously available. But capability develops in the domain, where the learner must act and where the work can answer back.")
LEARNING_REFS=[
('1. National Research Council. "How Experts Differ from Novices." How People Learn, 2000.','https://www.nationalacademies.org/read/9853/chapter/5'),
('2. Bisra et al. "Inducing Self-Explanation: A Meta-Analysis." Educational Psychology Review, 2018.','https://link.springer.com/article/10.1007/s10648-018-9434-x'),
('3. Agarwal et al. "Retrieval Practice Consistently Benefits Student Learning." 2021.','https://link.springer.com/article/10.1007/s10648-021-09595-9'),
('4. Feng et al. "Effectiveness of Peer-Assisted Learning." BMC Medical Education, 2024.','https://link.springer.com/article/10.1186/s12909-024-06434-7'),
('5. Kestin et al. "AI Tutoring Outperforms In-Class Active Learning." Scientific Reports, 2025.','https://www.nature.com/articles/s41598-025-97652-6')]


def learning():
    path='public/downloads/how-3back-approaches-learning.pdf'
    reader=PdfReader(BytesIO(baseline(path)));writer=PdfWriter();writer.clone_document_from_reader(reader)
    page=writer.pages[1];m3,w3=font_chars(page,'/F3+0');m2,_=font_chars(page,'/F2+0')
    c=ContentStream(page.get_contents(),writer);original=c.operations
    # Move Research foundation to a new page. At the original body size, the
    # approved paragraphs would run through the citations and footer on page 2.
    ops=original[:252]+original[357:372]
    dark=(.113725,.141176,.129412)
    for paragraph,start in [(LEARNING_OBJECTIVES,439.01),(LEARNING_INSTRUCTOR,385.01),(LEARNING_CAPABILITY,279.01),(LEARNING_GUIDE,223.01),(LEARNING_QUESTION,89.01)]:
        lines=wrap(paragraph,w3,9.45,239)
        for i,line in enumerate(lines):ops+=text_ops(315,start-13*i,line,'/F3+0',9.45,m3,color=dark)
    ops+=original[435:]
    page.pop(NameObject('/Annots'),None)
    set_page_ops(writer,1,ops)
    # New third page uses the original paper's background, brand header,
    # typography, footer rule, and full-width research citations.
    third=writer.add_blank_page(width=612,height=792)
    third[NameObject('/Resources')]=page['/Resources']
    new=original[:34]
    new+=text_ops(56.16,705,'Research foundation','/F2+0',14.2,m2,color=dark)
    link_positions=[];y=671
    for citation,uri in LEARNING_REFS:
        lines=wrap(citation,w3,9.45,499)
        for line in lines:
            new+=text_ops(56.16,y,line,'/F3+0',9.45,m3,color=dark);y-=13
        label='Source';x=56.16+width(lines[-1]+'  ',w3,9.45)
        if x+width(label,w3,9.45)>555:
            x=56.16;y-=13
        new+=text_ops(x,y+13,label,'/F3+0',9.45,m3,color=(.658824,.282353,.031373))
        link_positions.append((uri,x,y+12,x+width(label,w3,9.45),y+22))
        y-=28
    # The page 2 footer wording and URL are retained with page number 3.
    new+=text_ops(56.16,19,'How 3Back Approaches Learning','/F3+0',6.5,m3,color=dark)
    new+=text_ops(225.4,19,'3back.com/papers/how-3back-approaches-learning/','/F3+0',6.2,m3,color=dark)
    new+=text_ops(551.3,19,'3','/F3+0',7.1,m3,color=dark)
    new+=original[462:470]
    new.append(op('Q'))
    set_page_ops(writer,2,new)
    from pypdf.generic import RectangleObject
    for uri,x0,y0,x1,y1 in link_positions:
        writer.add_uri(2,uri,RectangleObject([x0,y0,x1,y1]),border=ArrayObject([NumberObject(0),NumberObject(0),NumberObject(0)]))
    now=datetime.now(timezone.utc);date=info_date(now)
    from pypdf.generic import NullObject
    original_meta={str(k):str(v) for k,v in (reader.metadata or {}).items() if v is not None and not isinstance(v,NullObject)}
    original_meta.update({'/ModDate':date,'/Creator':'3Back PDF regeneration script','/Producer':'pypdf 6.10.0 (based on ReportLab PDF)','/Keywords':'learning objectives; domain expertise; Practice Partners; Expert Echoes; 3Back','/Source':'https://3back.com/papers/how-3back-approaches-learning/','/Identifier':'https://3back.com/downloads/how-3back-approaches-learning.pdf','/Publisher':'3Back','/Copyright':'Copyright 2026 3Back. All rights reserved.'})
    writer.add_metadata(original_meta)
    writer._info.get_object().pop(NameObject('/Trapped'),None)
    add_learning_xmp(writer,reader,now,original_meta)
    out=OUTPUT/'how-3back-approaches-learning.pdf'
    with out.open('wb') as f:writer.write(f)
    print(out)

if __name__=='__main__':
    operational_grip()
    learning()
