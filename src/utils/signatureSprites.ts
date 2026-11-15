import type { PixelSpriteCompositor } from './pixelSpriteCompositor';

// Native-resolution silhouettes for the roster defaults. Custom loadouts still
// use the layered compositor; these are deliberately independent of its outfits.
export const SIGNATURE_CHARACTERS = new Set([
  'miles-morales', 'gwen-stacy', 'elsa', 'rapunzel',
  'purring-window-cat', 'loyal-fireplace-dog',
]);

export function drawSignatureSprite(p: PixelSpriteCompositor, id?: string | null): boolean {
  if (!id || !SIGNATURE_CHARACTERS.has(id)) return false;
  const rect = p.fillRect.bind(p), ellipse = p.fillEllipse.bind(p);
  const poly = p.fillPolygon.bind(p), line = p.strokeLine.bind(p);
  const ink = '#242638';
  if (id === 'purring-window-cat' || id === 'loyal-fireplace-dog') {
    const cat = id === 'purring-window-cat';
    const fur = cat ? '#c5a67c' : '#bd9062', shade = '#926d4e', cream = '#ecd5ac';
    // Curled tail, haunches, chest and four grounded paws.
    line(45, 74, 57, 66, shade, 6); line(57, 66, 58, 54, shade, 5);
    if (cat) line(58, 54, 53, 51, fur, 4);
    ellipse(35, 67, 19, 18, ink); ellipse(35, 66, 18, 17, fur);
    ellipse(44, 71, 9, 11, shade); ellipse(27, 67, 10, 15, cream);
    rect(20, 67, 6, 17, fur); rect(30, 67, 6, 17, fur);
    ellipse(21, 83, 7, 3, cream); ellipse(32, 83, 6, 3, cream);
    ellipse(45, 83, 9, 3, fur);
    ellipse(27, 43, 17, 16, ink); ellipse(27, 43, 16, 15, fur);
    if (cat) {
      poly([[11,38],[10,20],[24,30]], ink); poly([[30,30],[44,20],[43,39]], ink);
      poly([[13,34],[13,25],[21,31]], '#bd8d80'); poly([[34,31],[41,25],[40,35]], '#bd8d80');
      for (const x of [22,27,32]) line(x,29,x,34,shade,2);
      line(12,41,18,43,shade,2); line(37,43,43,40,shade,2);
      for (const x of [39,45,50]) line(x,55,x-2,62,shade,2);
    } else {
      ellipse(12, 45, 6, 13, '#76543e'); ellipse(43, 44, 6, 13, '#76543e');
      ellipse(13, 43, 3, 9, '#99704f'); ellipse(42, 42, 3, 9, '#99704f');
    }
    ellipse(21,49,8,6,cream); ellipse(33,49,8,6,cream);
    for (const x of [20,34]) {
      ellipse(x,41,3,3,cat ? '#a4b48a' : ink);
      rect(x,39,1,5,ink); rect(x-1,39,1,1,'#fff5dc');
    }
    poly([[24,47],[30,47],[27,51]],cat ? '#ac7b73' : '#443e38');
    line(27,51,27,53,shade); line(23,54,27,53,shade); line(27,53,31,54,shade);
    if (cat) {
      line(8,48,20,50,cream); line(8,53,20,52,cream);
      line(35,50,48,48,cream); line(35,52,48,54,cream);
    }
    line(18,58,36,58,cat ? '#778273' : '#91604d',2);
    rect(26,59,3,4,'#e2c079');
    for (const x of [18,22,30,34,43,47]) rect(x,83,1,2,shade);
    return true;
  }

  if (id === 'miles-morales' || id === 'gwen-stacy') {
    const gwen = id === 'gwen-stacy';
    const dark = '#202333', light = '#f0eee9', accent = gwen ? '#d65c99' : '#d13e50';
    // Long, distinct suit silhouette with separate boots and gloves.
    poly([[23,37],[40,37],[46,43],[45,61],[40,62],[38,54],[38,68],[42,85],[32,85],[30,69],[27,85],[18,85],[23,63],[21,53],[18,62],[12,60],[16,44]], ink);
    poly([[23,38],[40,38],[43,46],[38,57],[38,68],[32,68],[30,62],[27,68],[22,68],[23,54],[18,48]], dark);
    line(24,66,22,84,'#383f50',5); line(35,66,38,84,'#383f50',5);
    line(24,68,24,81,dark,3); line(35,68,36,81,dark,3);
    poly([[17,44],[23,40],[21,56],[18,61],[13,59]],gwen ? light : dark);
    poly([[39,40],[44,44],[45,59],[40,61],[38,54]],gwen ? light : dark);
    rect(13,58,6,7,gwen ? light : accent); rect(40,58,6,7,gwen ? light : accent);
    poly([[18,83],[27,83],[27,88],[15,88],[15,86]],gwen ? '#5cbdc4' : accent);
    poly([[32,83],[41,83],[45,87],[44,89],[32,88]],gwen ? '#5cbdc4' : accent);
    if (gwen) {
      poly([[23,38],[28,41],[31,48],[35,41],[40,38],[37,50],[31,55],[24,50]],light);
      line(18,45,19,54,accent,2); line(41,45,42,54,accent,2);
      for (const y of [46,50,54]) { line(16,y,20,y+2,'#70c2ca'); line(40,y,44,y+2,'#70c2ca'); }
      poly([[17,18],[20,10],[29,6],[39,10],[45,19],[44,32],[38,42],[24,40],[17,31]],ink);
      poly([[18,19],[22,11],[29,8],[38,12],[43,19],[42,32],[37,40],[25,38],[19,31]],light);
      ellipse(31,25,11,13,accent); ellipse(31,25,9,12,light);
      line(21,18,23,32,'#e9b5cf'); line(40,18,39,32,'#e9b5cf');
    } else {
      ellipse(31,23,13,17,ink); ellipse(31,23,12,16,dark);
      line(31,8,31,38,accent);
      for (const y of [14,22,30]) { line(20,y,31,y+3,'#793448'); line(31,y+3,42,y,'#793448'); }
      line(24,10,27,36,'#793448'); line(38,10,35,36,'#793448');
      ellipse(31,49,2,4,accent);
      for (const y of [45,48,51,54]) { line(30,y,25,y-3,accent); line(32,y,37,y-3,accent); }
      line(25,42,24,48,accent); line(37,42,38,48,accent);
    }
    poly([[21,20],[29,24],[27,30],[23,28]],gwen ? '#553d60' : accent);
    poly([[33,24],[41,20],[39,28],[35,30]],gwen ? '#553d60' : accent);
    poly([[22,21],[28,24],[26,28],[23,26]],light);
    poly([[34,24],[40,21],[38,26],[35,28]],light);
    return true;
  }

  const elsa = id === 'elsa';
  const hair = elsa ? '#eee4c9' : '#e8bb58', hairShade = elsa ? '#bcae92' : '#bc8c3d';
  const skin = '#f4d1b5', dress = elsa ? '#77bed4' : '#b281bc';
  // Rapunzel's hair reaches the hem; Elsa's translucent cape frames the gown.
  if (elsa) poly([[21,37],[40,37],[49,86],[13,86]],'#a3dbe2');
  else {
    poly([[19,18],[44,19],[47,46],[44,69],[50,81],[57,83],[57,88],[40,90],[14,86],[14,55]],hairShade);
    poly([[20,20],[42,20],[43,48],[40,71],[46,84],[55,85],[43,87],[17,83],[18,48]],hair);
    line(19,35,20,77,'#ffe09a',2); line(41,40,39,70,'#ffe09a',2);
  }
  poly([[24,39],[38,39],[41,47],[37,60],[44,84],[41,88],[20,88],[17,84],[25,59],[21,47]],ink);
  poly([[24,40],[38,40],[39,48],[35,59],[42,85],[21,86],[19,83],[27,59],[23,48]],dress);
  poly([[28,60],[34,60],[38,85],[25,86]],elsa ? '#a2dce4' : '#d5a8d5');
  line(25,65,22,82,elsa ? '#4c98b7' : '#94639f');
  line(35,64,39,81,elsa ? '#e0f7ef' : '#efc7e3');
  rect(27,34,8,9,skin);
  line(23,41,18,53,elsa ? '#abdbe3' : '#d1a1ca',5);
  line(39,41,43,53,elsa ? '#abdbe3' : '#d1a1ca',5);
  line(18,53,20,63,skin,3); line(43,53,41,63,skin,3);
  ellipse(20,64,2,3,skin); ellipse(41,64,2,3,skin);
  if (elsa) {
    poly([[25,45],[30,48],[36,44],[35,59],[28,60]],'#5eafca');
    for (const [x,y] of [[29,51],[33,56],[30,69],[36,78]]) { rect(x,y,1,3,'#ecfcf6'); rect(x-1,y+1,3,1,'#ecfcf6'); }
  } else {
    rect(27,45,9,13,'#93629f');
    for (const y of [46,50,54]) { line(28,y,34,y+3,'#f4c2dc'); line(34,y,28,y+3,'#f4c2dc'); }
    line(23,42,24,47,'#f4c2dc'); line(39,42,38,47,'#f4c2dc');
    rect(22,87,6,2,skin); rect(35,87,6,2,skin);
  }
  ellipse(31,23,13,16,hairShade); ellipse(31,24,11,14,skin);
  ellipse(25,25,3,3,'#fff8ea'); ellipse(37,25,3,3,'#fff8ea');
  rect(25,24,2,4,elsa ? '#518fba' : '#579c83'); rect(36,24,2,4,elsa ? '#518fba' : '#579c83');
  rect(25,24,1,2,ink); rect(36,24,1,2,ink);
  line(22,23,27,22,'#695055'); line(34,22,39,23,'#695055');
  line(29,33,34,33,'#b65c7e'); rect(31,29,1,1,'#ce9b85');
  poly([[18,22],[18,15],[22,10],[31,7],[40,10],[44,18],[42,27],[38,17],[30,14],[25,20]],hair);
  line(21,16,30,11,'#fff1cf',2); line(31,11,39,14,'#fff1cf');
  if (elsa) {
    for (let i=0;i<6;i++) {
      ellipse(42-Math.floor(i/2),34+i*4,3,3,i%2 ? hairShade : hair);
      line(40-Math.floor(i/2),34+i*4,42-Math.floor(i/2),36+i*4,'#fff1d4');
    }
    rect(38,57,3,2,'#64aabe'); poly([[38,59],[41,59],[40,65],[37,64]],hair);
  }
  return true;
}
