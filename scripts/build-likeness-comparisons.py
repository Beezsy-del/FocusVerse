from pathlib import Path
from PIL import Image,ImageDraw
root=Path('docs/likeness-correction');after=root/'after';refs=root/'references'
variants=[('miles-morales','masked','spider-5'),('miles-morales','unmasked','spider-5'),('gwen-stacy','masked','spider-4'),('gwen-stacy','unmasked','spider-2'),('elsa','default','elsa'),('rapunzel','default','rapunzel'),('moana','default','moana'),('neo','default','neo'),('officer-k','default','k')]
rows=[]
for id,look,ref in variants:
 row=Image.new('RGB',(1560,390),'#131b28');d=ImageDraw.Draw(row)
 for col,pose in enumerate(['reference','idle','observe','action0','action1','face']):
  file=refs/(ref+'.jpg') if pose=='reference' else after/(id+'-'+look+'-'+pose+'.png')
  im=Image.open(file).convert('RGB');im.thumbnail((252,335))
  if pose=='face':im=im.resize((im.width*2,im.height*2),Image.Resampling.LANCZOS);im.thumbnail((252,335))
  row.paste(im,(col*260+(260-im.width)//2,20+(335-im.height)//2));d.text((col*260+10,358),pose+(' (2x)' if pose=='face' else ''),fill='#c7d7dc')
 d.text((10,5),id+' / '+look,fill='white');row.save(root/(id+'-'+look+'-comparison.jpg'));rows.append(row)
combined=Image.new('RGB',(1560,len(rows)*390),'#131b28')
for i,row in enumerate(rows):combined.paste(row,(0,i*390))
combined.save(root/'comparison-sheet.jpg')
# Full roster actual-application audit: current targeted captures plus new audit and preserved reference captures.
ids=['peter-parker','bruce-wayne','naruto-uzumaki','tony-stark','miles-morales','gwen-stacy','gojo-satoru','levi-ackerman','l-lawliet','elsa','rapunzel','moana','hermione-granger','wednesday-addams','officer-k','neo','cozy-study-girl','late-night-study-boy','purring-window-cat','loyal-fireplace-dog']
out=Image.new('RGB',(1400,1520),'#131b28');d=ImageDraw.Draw(out)
for i,id in enumerate(ids):
 if id in ['miles-morales','gwen-stacy']:file=after/(id+'-unmasked-action0.png')
 elif id in ['elsa','rapunzel','moana','neo','officer-k']:file=after/(id+'-default-action0.png')
 elif id in ids[:3]:file=Path('docs/character-refinement')/(id+'-0-detail.png')
 else:file=Path('docs/roster-overhaul/likeness-audit')/(id+'-0-detail.png')
 im=Image.open(file);im.thumbnail((276,345));x=i%5*280;y=i//5*380;out.paste(im,(x+(280-im.width)//2,y));d.text((x+8,y+350),id,fill='white')
out.save(root/'full-roster-audit.jpg')
