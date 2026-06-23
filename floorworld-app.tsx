import { useState } from "react";

const OG="#E87722", GD="#C9A84C", DK="#070707", C1="#101010", C2="#181818", BL="#1C1C1C";
const B="https://www.floorworld.com";
const fw=p=>`${B}${p}`;

const FontStyle=()=>(
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700;800;900&display=swap');
    *{box-sizing:border-box;margin:0;padding:0;}
    body,input,select,textarea,button{font-family:'Montserrat',sans-serif!important;}
    ::-webkit-scrollbar{display:none;}
  `}</style>
);

/* ══ ALL CONFIRMED IMAGE URLs FROM FLOORWORLD PAGES ══ */
const I={
  /* Logo */
  logo:      fw("/media/g00ff3aj/floorworld-new-logo-final.jpg"),
  /* Hero & General */
  hero:      fw("/media/y4ibbgwx/floorworld-installation-image.jpg"),
  measure:   fw("/media/qoedlzka/measuring-floor-img.webp"),
  /* Wood */
  woodBan:   fw("/media/cutjx1fw/wood-banners.jpg"),
  woodMain:  fw("/media/iy1j4gm4/rp-oxford-classic-dawn-09-engineered-wood-kitchen-flooring.jpg"),
  woodOff:   fw("/media/heaj2ill/rp-frosted-oak-01-engineered-wood-flooring-office.jpg"),
  oxford:    fw("/media/rxbo0dmc/rp-oxford-classic-nordic-driftwod-04-engineered-wood-flooring-kitchen.jpg"),
  windsor:   fw("/media/gi4jn1jc/rp-windsor-classic-steel-22-family-room-engineered-wood-flooring.jpg"),
  cambridge: fw("/media/q5kl44d0/rp-cambridge-classic-colorado-20-familyroom-engineered-wood-flooring.jpg"),
  chevron:   fw("/media/bcyhon0g/rp-chevron-cedarstone-11-engineered-wood-flooring-coffeeshop.jpg"),
  herring:   fw("/media/qcvlzgsb/rp-herringbone-dove-14-engineered-wood-flooring-reception-waiting-area.jpg"),
  chelsea:   fw("/media/jtwf2qql/rp-chelsea-square-parquetry-flooring.jpg"),
  /* Laminate */
  lamBan:    fw("/media/heynmdym/gerbur-hydrolock-laminate-banners-water-resistant.jpg"),
  hydroBed:  fw("/media/2elpwnkd/gerbur-hydrolock-gb-hyl-01-bedroom.jpg"),
  hydroW:    fw("/media/wixdhiwp/gerbur-hydrolock-gb-hyl-01-water-resistant.jpg"),
  gUltra:    fw("/media/x0wbythh/gerbur-natural-blond-oak-gb-ult-05-modern-livingroom.jpg"),
  /* Vinyl */
  vinylBan:  fw("/media/k0aaqitw/gerbu-r-aqua-click-vinyl-click-banners.jpg"),
  vClick:    fw("/media/2hddl2hs/gerbuer-aqua-click-washed-oak-modern-bedroom-vinyl-click.jpg"),
  /* SPC */
  spc:       fw("/media/hmbptqfc/gerbuer-oak-limed-gb-eng-spc-01-living-room.jpg"),
  /* Carpet */
  carpet:    fw("/media/kjbat4mr/bcm-sig-hur-05-04-03-office.jpg"),
  /* Outdoor */
  outdoor:   fw("/media/xotjpreg/outdoor-flooring.jpg"),
  /* Accessories — each with its own confirmed image */
  accMain:   fw("/media/fj5dn2j1/accessories.jpg"),
  skirt:     fw("/media/armcizy2/skirtings.jpg"),
  skirt2:    fw("/media/a2ofcclq/skirting-matching-profile-accessories.jpg"),
  skirtVen:  fw("/media/2eqjyu0o/rp-wood-veneer-l-cover-skirting-thumbnail.jpg"),
  skirtStd:  fw("/media/qdiejshm/rp-wood-veneer-skirting-thumbnail.jpg"),
  skirtSol:  fw("/media/lnvpd3xu/rp-solid-skirting-thumbnail.jpg"),
  skirtWh:   fw("/media/ixvg4ddd/white-foiled-lacquered-skirting.jpg"),
  lAng15:    fw("/media/2evneuq2/rp-solid-wood-l-angle-15mm-thumbnail.jpg"),
  lAng5:     fw("/media/p3foqt2p/rp-solid-wood-l-angle-thumbnail.jpg"),
  tbar:      fw("/media/31hp2frd/rp-solid-wood-t-bar-thumbnail.jpg"),
  reducer:   fw("/media/jinjzcmv/skirting-installation-image.jpg"),
  /* Projects */
  p1: fw("/media/wbimh5sr/file-1560234342.jpg"),
  p2: fw("/media/bk2ftpyz/floorstyle-img1.webp"),
  p3: fw("/media/j05dbxsc/file-1535540190.jpg"),
  p4: fw("/media/x0wbythh/gerbur-natural-blond-oak-gb-ult-05-modern-livingroom.jpg"),
  p5: fw("/media/4afastjl/file-1615465366.jpg"),
  p6: fw("/media/kjbat4mr/bcm-sig-hur-05-04-03-office.jpg"),
};

/* ══ SVG TEXTURE FALLBACKS ══ */
function makeTex(colors,pw=24){
  const off=[[70,160,250],[30,140,235],[85,175,265],[50,150,240],[90,185,270],[35,145,230]];
  let s=`<svg xmlns='http://www.w3.org/2000/svg' width='300' height='${colors.length*(pw+2)}'>`;
  colors.forEach((c,i)=>{
    const y=i*(pw+2);
    s+=`<rect x='0' y='${y}' width='300' height='${pw}' fill='${c}'/>`;
    (off[i]||off[0]).forEach(x=>{s+=`<line x1='${x}' y1='${y}' x2='${x}' y2='${y+pw}' stroke='rgba(0,0,0,.12)' stroke-width='1'/>`});
    s+=`<line x1='0' y1='${y+pw}' x2='300' y2='${y+pw}' stroke='rgba(0,0,0,.22)' stroke-width='2'/>`;
  });
  return `url("data:image/svg+xml,${encodeURIComponent(s+`</svg>`)}")`;
}
const TEX={
  wood:    makeTex(["#9B7030","#7A5020","#8B6528","#6B4515","#A07A35","#785018"],24),
  lam:     makeTex(["#AA8545","#906B35","#BA9558","#806535","#B09050","#907040"],22),
  vinyl:   makeTex(["#5A7A90","#4A6A80","#6A8AA2","#3A5A70","#557098","#486580"],20),
  spc:     makeTex(["#787878","#686868","#888888","#585858","#808080","#707070"],22),
  carpet:  makeTex(["#6A5848","#5A4838","#7A6858","#4A3828","#625040","#523828"],20),
  out:     makeTex(["#6A5030","#5A4020","#7A6040","#4A3010","#655030","#554020"],34),
  acc:     makeTex(["#383838","#282828","#444444","#222222","#3A3A3A","#2E2E2E"],20),
  clear:   makeTex(["#C45000","#A84000","#D86010","#903000"],24),
  dark:    makeTex(["#1A2530","#101820","#202C3A","#0A1015"],22),
};

/* ══ Image Component — tries real URL, falls back to SVG texture ══ */
function Img({src,alt,style,tex="wood"}){
  const [err,setErr]=useState(false);
  if(err) return <div style={{backgroundImage:TEX[tex],backgroundSize:"auto 80px",backgroundRepeat:"repeat",...style}}/>;
  return(
    <img src={src} alt={alt||""} referrerPolicy="no-referrer" crossOrigin="anonymous"
      onError={()=>setErr(true)}
      style={{objectFit:"cover",display:"block",...style}}/>
  );
}

/* ══ FLOORWORLD LOGO (from their own CDN) ══ */
function LogoBanner(){
  const [err,setErr]=useState(false);
  if(err) return <FallbackBanner/>;
  return(
    <div style={{background:OG,padding:"10px 14px 8px"}}>
      <img src={I.logo} alt="Floorworld LLC" referrerPolicy="no-referrer"
        onError={()=>setErr(true)}
        style={{height:48,maxWidth:"100%",objectFit:"contain",objectPosition:"left"}}/>
    </div>
  );
}
function FallbackBanner(){
  return(
    <div style={{background:OG,padding:"11px 14px 8px"}}>
      <div style={{display:"flex",alignItems:"center",gap:0,lineHeight:1}}>
        <span style={{color:"#fff",fontWeight:900,fontSize:32,letterSpacing:"-0.5px"}}>FLOORW</span>
        <svg width={33} height={33} viewBox="0 0 33 33"><circle cx="16.5" cy="16.5" r="15" fill="none" stroke="#fff" strokeWidth="2"/><ellipse cx="16.5" cy="16.5" rx="7.5" ry="15" fill="none" stroke="#fff" strokeWidth="1.5"/><line x1="1.5" y1="16.5" x2="31.5" y2="16.5" stroke="#fff" strokeWidth="1.5"/><line x1="3" y1="9.5" x2="30" y2="9.5" stroke="#fff" strokeWidth="1"/><line x1="3" y1="23.5" x2="30" y2="23.5" stroke="#fff" strokeWidth="1"/></svg>
        <span style={{color:"#fff",fontWeight:900,fontSize:32,letterSpacing:"-0.5px"}}>RLD</span>
        <span style={{color:"#fff",fontWeight:700,fontSize:15,alignSelf:"flex-start",marginTop:3,marginLeft:4}}>LLC</span>
      </div>
      <div style={{color:"rgba(0,0,0,.52)",fontSize:8.5,fontWeight:700,letterSpacing:1.6,marginTop:4}}>THE BIGGEST FLOORING COMPANY IN THE MIDDLE EAST</div>
    </div>
  );
}

const LogoCompact=()=>(
  <div style={{display:"flex",alignItems:"center",gap:8}}>
    <div style={{background:OG,borderRadius:4,padding:"3px 7px"}}>
      <span style={{color:"#fff",fontWeight:900,fontSize:13,letterSpacing:1}}>FW</span>
    </div>
    <div>
      <div style={{color:"#fff",fontWeight:900,fontSize:13,letterSpacing:1}}>FLOORWORLD</div>
      <div style={{color:OG,fontSize:6.5,fontWeight:700,letterSpacing:1.2}}>PREMIUM FLOORING · UAE</div>
    </div>
  </div>
);

/* ══ DATA with correct images per section ══ */
const cats=[
  {id:"wood",name:"Wood Flooring",emoji:"🪵",tex:"wood",
   banner:I.woodBan,img:I.woodMain,
   desc:"Real timber beauty — Royal Parquet, SwissHardwood, ECO Wood & Universal Flooring.",
   brands:["Royal Parquet","SwissHardwood","ECO Wood","Universal Flooring"],
   subs:[
    {id:"eng",name:"Engineered Wood Flooring",tex:"wood",img:I.woodOff,
     desc:"Real hardwood surface with climate-stable construction for UAE homes, villas and hotels.",
     products:[
      {name:"Oxford Classic",brand:"Royal Parquet",tex:"wood",img:I.oxford,price:"AED 149/m²",
       specs:{Width:"127 mm",Thickness:"14 mm","Wear Layer":"4 mm",Finish:"Matt Lacquer",Species:"European Oak",Install:"Floating / Glue-down",Best:"Apartments · Hallways · Offices"}},
      {name:"Windsor Classic",brand:"Royal Parquet",tex:"wood",img:I.windsor,price:"AED 189/m²",
       specs:{Width:"190 mm",Thickness:"14 mm","Wear Layer":"4 mm",Finish:"Matt Lacquer",Species:"European Oak",Install:"Floating / Glue-down",Best:"Villas · Hotels · Suites"}},
      {name:"Cambridge Classic",brand:"Royal Parquet",tex:"wood",img:I.cambridge,price:"AED 229/m²",
       specs:{Width:"240 mm",Thickness:"14 mm","Wear Layer":"4 mm",Finish:"Matt Lacquer",Species:"European Oak",Install:"Floating / Glue-down",Best:"Luxury Villas · Penthouses"}},
    ]},
    {id:"parq",name:"Parquet Flooring",tex:"wood",img:I.chevron,
     desc:"Classic geometric patterns in premium European Oak for timeless, sophisticated interiors.",
     products:[
      {name:"Chevron",brand:"Royal Parquet",tex:"wood",img:I.chevron,price:"AED 249/m²",
       specs:{Pattern:"Chevron",Finish:"Ultra-Matt Lacquer",Species:"European Oak – Classic Grade",Install:"Glue-down",Best:"Hotels · Luxury Retail · Villas"}},
      {name:"Herringbone",brand:"Royal Parquet",tex:"wood",img:I.herring,price:"AED 249/m²",
       specs:{Pattern:"Herringbone",Finish:"Ultra-Matt Lacquer",Species:"European Oak – Classic Grade",Install:"Glue-down",Best:"Hotel Lobbies · Villas · Offices"}},
    ]},
    {id:"chelsea",name:"Chelsea Squares",tex:"wood",img:I.chelsea,
     desc:"Distinctive 600×600 mm square-pattern engineered parquet for statement rooms.",
     products:[
      {name:"Chelsea Squares",brand:"Royal Parquet",tex:"wood",img:I.chelsea,price:"AED 289/m²",
       specs:{Pattern:"Square / Parquetry",Size:"600 × 600 mm",Finish:"Lacquer",Species:"European Oak",Install:"Glue-down",Best:"Feature Rooms · Hotels · Retail"}},
    ]},
    {id:"boa",name:"Boa Hybrid Herringbone",tex:"wood",img:I.woodMain,
     desc:"Modern herringbone combining real wood aesthetics with hybrid flooring resilience.",products:[]},
  ]},
  {id:"laminate",name:"Laminate Flooring",emoji:"📐",tex:"lam",
   banner:I.lamBan,img:I.hydroBed,
   desc:"Beauty, durability and practicality with superior wear resistance.",
   brands:["Gerbür","Quick-Step"],
   subs:[
    {id:"hydro",name:"Gerbür HydroLock",tex:"lam",img:I.hydroBed,
     desc:"100% waterproof laminate — kitchens, bathrooms and high-humidity UAE environments.",
     products:[
      {name:"HydroLock Natural Oak",brand:"Gerbür",tex:"lam",img:I.hydroBed,price:"AED 89/m²",
       specs:{Thickness:"8 mm",Width:"193 mm",Length:"1380 mm","AC Rating":"AC4",Waterproof:"100% HydroLock",Install:"Click-Lock",Best:"All Rooms · Kitchens · Bathrooms"}},
    ]},
    {id:"qsimp",name:"Quick-Step Impressive",tex:"lam",img:I.hydroW,
     desc:"Award-winning laminate with superior scratch and impact resistance.",
     products:[
      {name:"Quick-Step Impressive",brand:"Quick-Step",tex:"lam",img:I.hydroW,price:"AED 109/m²",
       specs:{Thickness:"8 mm",Width:"190 mm",Length:"1380 mm","AC Rating":"AC5",Waterproof:"Water-Resistant",Install:"Uniclic Click",Best:"Homes · Offices · Commercial"}},
    ]},
    {id:"qseli",name:"Quick-Step Eligna",tex:"lam",img:I.gUltra,desc:"Natural wood-look with authentic texture and exceptional durability.",products:[]},
    {id:"gprime",name:"Gerbür Prime",tex:"lam",img:I.gUltra,desc:"Premium deep-embossed texture and ultra-realistic wood finish.",products:[]},
    {id:"gultra",name:"Gerbür Ultra",tex:"lam",img:I.gUltra,desc:"Ultra-wide plank laminate for contemporary open-plan spaces.",products:[]},
  ]},
  {id:"vinyl",name:"Vinyl Flooring",emoji:"💧",tex:"vinyl",
   banner:I.vinylBan,img:I.vClick,
   desc:"100% waterproof, comfortable underfoot, in lifelike wood and stone finishes.",
   brands:["Gerbür","BerryAlloc","Quick-Step"],
   subs:[
    {id:"vclick",name:"Vinyl Click",tex:"vinyl",img:I.vClick,
     desc:"Easy click-lock, fully waterproof — ideal for all rooms including wet areas.",
     products:[
      {name:"Gerbür Aqua Click Washed Oak",brand:"Gerbür",tex:"vinyl",img:I.vClick,price:"AED 79/m²",
       specs:{Thickness:"5 mm",Width:"182 mm",Length:"1220 mm",Waterproof:"100%",Install:"Click-Lock",Best:"All Rooms incl. Kitchens & Bathrooms"}},
    ]},
    {id:"lvt",name:"Luxury Vinyl Tiles (LVT)",tex:"vinyl",img:I.vinylBan,desc:"Premium tile format with ultra-realistic texture and comfort underfoot.",products:[]},
    {id:"sheet",name:"Sheet Vinyl",tex:"vinyl",img:I.vinylBan,desc:"Seamless coverage for large areas — hygienic and easy to maintain.",products:[]},
  ]},
  {id:"spc",name:"SPC Flooring",emoji:"🔩",tex:"spc",
   banner:I.spc,img:I.spc,
   desc:"100% waterproof rigid Stone Plastic Composite — the ultimate modern flooring.",
   brands:["Gerbür","Engage"],
   subs:[
    {id:"engage",name:"Engage SPC",tex:"spc",img:I.spc,
     desc:"Rigid core with wood & stone visuals. 100% waterproof, glue-free click system.",
     products:[
      {name:"Engage SPC Oak Limed Stone",brand:"Gerbür / Engage",tex:"spc",img:I.spc,price:"AED 95/m²",
       specs:{Thickness:"6 mm","Core":"Stone Plastic Composite",Width:"178 mm",Length:"1220 mm",Waterproof:"100% Rigid Core",Install:"Click-Lock",Best:"All Areas · Wet Rooms · Commercial"}},
    ]},
  ]},
  {id:"carpet",name:"Carpet Flooring",emoji:"🛋️",tex:"carpet",
   banner:I.carpet,img:I.carpet,
   desc:"Luxury, comfort and timeless style from Mohawk, British Carpet Mills, Lano & Balta.",
   brands:["Mohawk Group","Lano","Balta","British Carpet Mills","Standard Carpets"],
   subs:[
    {id:"ctile",name:"Carpet Tiles",tex:"carpet",img:I.carpet,
     desc:"Modular tiles — design flexibility, easy maintenance and replacement.",
     products:[
      {name:"British Carpet Mills – Signature",brand:"British Carpet Mills",tex:"carpet",img:I.carpet,price:"AED 45/tile",
       specs:{Format:"500 × 500 mm Tile",Pile:"Loop / Cut & Loop",Backing:"Bitumen",Install:"Glue-down / Loose-lay",Best:"Offices · Retail · Hospitality"}},
    ]},
    {id:"wtw",name:"Wall to Wall Carpet",tex:"carpet",img:I.carpet,desc:"Plush seamless carpet for bedrooms, lounges, majlis and hospitality spaces.",products:[]},
  ]},
  {id:"outdoors",name:"Outdoors",emoji:"🌿",tex:"out",
   banner:I.outdoor,img:I.outdoor,
   desc:"Durable, weather-resistant surfaces for UAE outdoor living.",
   brands:[],
   subs:[
    {id:"deck",name:"Decking",tex:"out",img:I.outdoor,
     desc:"Smart Board Composite Decking — timber-inspired, UV-resistant and low-maintenance.",
     products:[
      {name:"Smart Board Composite Decking",brand:"Floorworld",tex:"out",img:I.outdoor,price:"AED 185/m²",
       specs:{Material:"Composite Wood-Polymer",Width:"140 mm","Board Length":"3600 mm",Finish:"Wood-Grain Texture",Waterproof:"100% UV-Resistant",Best:"Pools · Terraces · Rooftops"}},
    ]},
    {id:"grass",name:"Artificial Grass",tex:"out",img:I.outdoor,
     desc:"Realistic lush turf — vibrant year-round with zero maintenance.",
     products:[
      {name:"Standard Turf Artificial Grass",brand:"Floorworld",tex:"out",img:I.outdoor,price:"AED 55/m²",
       specs:{"Pile Height":"35–40 mm","Blade Type":"W-Shape / C-Shape",Backing:"PP + Latex",Infill:"Silica Sand",Best:"Gardens · Rooftops · Play Areas"}},
    ]},
  ]},
  {id:"accessories",name:"Flooring Accessories",emoji:"🔧",tex:"acc",
   banner:I.accMain,img:I.accMain,
   desc:"Professional finishing details — skirtings, profiles, underlay and care products.",
   brands:["Royal Parquet","Gerbür","Timbermate"],
   subs:[
    {id:"skirt",name:"Skirtings",tex:"acc",img:I.skirt,
     desc:"Laminate, oak veneer, solid oak and white foiled skirtings for any interior.",
     products:[
      {name:"Gerbür Laminate Skirtings",brand:"Gerbür",tex:"acc",img:I.skirt2,price:"AED 18/LM",specs:{Material:"MDF + Laminate",Height:"58 mm",Length:"2400 mm",Best:"Laminate Floors"}},
      {name:"RP Wood Oak Veneer L-Cover",brand:"Royal Parquet",tex:"acc",img:I.skirtVen,price:"AED 45/LM",specs:{Material:"MDF + Oak Veneer",Size:"2440×100×25 mm",Best:"Engineered Wood · Parquet"}},
      {name:"RP Wood Veneer Standard",brand:"Royal Parquet",tex:"acc",img:I.skirtStd,price:"AED 38/LM",specs:{Material:"MDF + Oak Veneer",Size:"2220×100×14 mm",Best:"Engineered Wood · Laminate"}},
      {name:"RP Solid Skirting",brand:"Royal Parquet",tex:"acc",img:I.skirtSol,price:"AED 55/LM",specs:{Material:"Solid Wood",Size:"2130×100×15 mm",Best:"Premium Interiors"}},
      {name:"White Foiled Lacquered Skirting",brand:"Royal Parquet",tex:"acc",img:I.skirtWh,price:"AED 22/LM",specs:{Finish:"White Foiled Lacquer",Height:"80 mm",Best:"Modern / Contemporary"}},
    ]},
    {id:"langle",name:"L-Angle Stair Nosing",tex:"acc",img:I.lAng15,
     desc:"Premium AB Grade Oak stair edge profiles for safe, stylish stair transitions.",
     products:[
      {name:"L-Angle Stair Nosing 15mm",brand:"Royal Parquet",tex:"acc",img:I.lAng15,price:"AED 65/LM",specs:{Profile:"L-Angle",Size:"2130 × 50 × 50 × 15 mm",Material:"AB Grade Oak",Best:"Heavy-Duty Stairs"}},
      {name:"L-Angle Stair Nosing 5mm",brand:"Royal Parquet",tex:"acc",img:I.lAng5,price:"AED 48/LM",specs:{Profile:"L-Angle",Size:"2130 × 50 × 50 × 5 mm",Material:"AB Grade Oak",Best:"Standard Stairs"}},
    ]},
    {id:"trans",name:"Transition Profiles",tex:"acc",img:I.tbar,
     desc:"T-Bars, Reducers and Beadings for seamless floor-to-floor transitions.",
     products:[
      {name:"Solid T-Bar",brand:"Royal Parquet",tex:"acc",img:I.tbar,price:"AED 37/LM",specs:{Profile:"T-Bar",Material:"AB Grade Oak",Use:"Equal-height transitions",Best:"Doorways · Open-plan layouts"}},
      {name:"Solid Reducer",brand:"Royal Parquet",tex:"acc",img:I.reducer,price:"AED 42/LM",specs:{Profile:"Reducer Ramp",Material:"AB Grade Oak",Use:"Height-change transitions",Best:"Floor type changes"}},
      {name:"Solid Beading",brand:"Royal Parquet",tex:"acc",img:I.skirt2,price:"AED 28/LM",specs:{Profile:"Quad / Scotia",Material:"Solid Wood",Use:"Wall-to-floor junction",Best:"All floor types"}},
    ]},
    {id:"underlay",name:"Underlay",tex:"acc",img:I.accMain,
     desc:"EVA, EPE, rubber and PU foam underlays for vinyl, laminate, wood and carpet.",
     products:[]},
    {id:"aftercare",name:"After Care Products",tex:"acc",img:I.accMain,
     desc:"Specialist floor cleaning, polishing and maintenance products from trusted brands.",
     products:[]},
  ]},
  {id:"clearance",name:"Clearance Sale",emoji:"🏷️",tex:"clear",
   banner:I.gUltra,img:I.gUltra,
   desc:"Premium European flooring at unbeatable clearance prices — limited stock.",
   brands:[],subs:[]},
];

const projects=[
  {label:"Villa – Dubai",img:I.p1},{label:"Luxury Apartment",img:I.p2},
  {label:"Commercial Space",img:I.p3},{label:"Modern Home",img:I.p4},
  {label:"Hotel Project",img:I.p5},{label:"Office Space",img:I.p6},
];

const services=[
  {icon:"📏",t:"Free Site Visit & Quote",d:"Professional visit within 24 hrs. Accurate measurements & no-obligation quotation across UAE.",tag:"24hr"},
  {icon:"🔨",t:"Installation Services",d:"70+ trained installers. All work carries a 1-year installation warranty.",tag:"1yr Warranty"},
  {icon:"📦",t:"Free Samples",d:"Take home free flooring samples to compare colours and textures under your own lighting.",tag:"Free"},
  {icon:"🚚",t:"Free Delivery UAE",d:"Free delivery on eligible orders to Dubai, Abu Dhabi, Sharjah, RAK, Al Ain and beyond.",tag:"Free"},
  {icon:"🎨",t:"Room Visualizer Tool",d:"See exactly how your chosen floor looks in your space before you commit.",tag:"Online"},
  {icon:"💰",t:"Price Match Guarantee",d:"We match any like-for-like UAE competitor price — guaranteed.",tag:"Guaranteed"},
  {icon:"📐",t:"Measuring & Estimation",d:"Free professional measuring & accurate material estimation — no hidden costs.",tag:"Free"},
  {icon:"🌿",t:"Floor Care & Maintenance",d:"Expert guidance & products to keep your floors perfect for years.",tag:""},
  {icon:"💬",t:"Customer Care Centre",d:"Dedicated support for all queries, orders, deliveries and after-sales service.",tag:""},
  {icon:"🏪",t:"Click & Collect",d:"Collect directly from any Floorworld showroom — stock confirmed in advance.",tag:""},
];
const showrooms=[
  {city:"Dubai – Al Barsha 2",addr:"Umm Suqeim Street, Al Barsha 2",ph:"+971 4 889 5661",main:true},
  {city:"Dubai – Investment Park 2",addr:"Plot 597-733, Dubai Investment Park 2",ph:"+971 4 889 5661",main:true},
  {city:"Abu Dhabi",addr:"Abu Dhabi Showroom",ph:"800 Floor (35667)"},
  {city:"Sharjah",addr:"Sharjah Furniture Complex Industrial",ph:"800 Floor (35667)"},
  {city:"Ras Al Khaimah",addr:"RAK Showroom",ph:"800 Floor (35667)"},
  {city:"Al Ain",addr:"Al Ain Showroom",ph:"800 Floor (35667)"},
  {city:"Oman",addr:"Muscat, Oman",ph:"800 Floor (35667)"},
];

const inp={width:"100%",background:"#111",border:"1px solid #1E1E1E",borderRadius:8,padding:"12px 14px",color:"#fff",fontSize:13,marginBottom:10,outline:"none"};
const lbl={color:"#666",fontSize:9,fontWeight:700,letterSpacing:1.8,marginBottom:4,display:"block"};

/* ════════ APP ════════ */
export default function App(){
  const [tab,setTab]=useState("home");
  const [cat,setCat]=useState(null);
  const [sub,setSub]=useState(null);
  const [prod,setProd]=useState(null);
  const [basket,setBasket]=useState([]);
  const [form,setForm]=useState({name:"",phone:"",email:"",space:"",area:"",notes:""});
  const [sent,setSent]=useState(false);
  const [abt,setAbt]=useState("about");

  const addS=(p,cN,sN)=>{if(!basket.find(b=>b.name===p.name))setBasket(bk=>[...bk,{...p,cat:cN,col:sN}]);};
  const remS=n=>setBasket(bk=>bk.filter(b=>b.name!==n));
  const setF=(k,v)=>setForm(f=>({...f,[k]:v}));
  const goTab=id=>{setTab(id);if(id!=="catalog"){setCat(null);setSub(null);setProd(null);}};
  const back=()=>{prod?setProd(null):sub?setSub(null):setCat(null);};

  return(
    <div style={{fontFamily:"'Montserrat',sans-serif",background:DK,color:"#fff",minHeight:"100vh",maxWidth:430,margin:"0 auto",paddingBottom:68}}>
      <FontStyle/>
      <div style={{background:"rgba(7,7,7,.97)",backdropFilter:"blur(12px)",padding:"9px 14px",display:"flex",alignItems:"center",justifyContent:"space-between",position:"sticky",top:0,zIndex:300,borderBottom:"1px solid #1A1A1A"}}>
        <div style={{display:"flex",alignItems:"center",gap:7}}>
          {(prod||sub||cat)&&<button onClick={back} style={{background:"none",border:"none",color:OG,fontSize:26,cursor:"pointer",lineHeight:1,paddingRight:3}}>‹</button>}
          <LogoCompact/>
        </div>
        <div style={{display:"flex",gap:7,alignItems:"center"}}>
          {basket.length>0&&<button onClick={()=>goTab("contact")} style={{background:C1,border:"1px solid #2A2A2A",color:OG,borderRadius:20,padding:"5px 11px",fontSize:10,fontWeight:700,cursor:"pointer"}}>🧺 {basket.length}</button>}
          <a href="tel:80035667" style={{background:OG,color:"#fff",padding:"6px 14px",borderRadius:20,fontSize:10,fontWeight:800,textDecoration:"none"}}>📞 800 FLOOR</a>
        </div>
      </div>

      {tab==="home"    &&!cat&&<Home    onCat={c=>{setCat(c);setTab("catalog");}} onReq={()=>goTab("contact")}/>}
      {tab==="catalog" &&!cat&&<Catalog onCat={c=>{setCat(c);setSub(null);setProd(null);}}/>}
      {tab==="catalog" &&cat&&!sub&&!prod&&<CatPg  cat={cat} onSub={s=>{setSub(s);setProd(null);}} onReq={()=>goTab("contact")}/>}
      {tab==="catalog" &&cat&&sub&&!prod&&<SubPg  sub={sub} cat={cat} onProd={setProd} onReq={()=>goTab("contact")} addS={addS} basket={basket}/>}
      {tab==="catalog" &&cat&&sub&&prod&&<ProdPg prod={prod} cat={cat} sub={sub} onReq={()=>goTab("contact")} addS={addS} basket={basket}/>}
      {tab==="services"&&<Svcs onReq={()=>goTab("contact")}/>}
      {tab==="about"   &&<Abt  sec={abt} setSec={setAbt}/>}
      {tab==="contact" &&<Ctct form={form} setF={setF} sent={sent} setSent={setSent} basket={basket} remS={remS}/>}

      <nav style={{position:"fixed",bottom:0,left:"50%",transform:"translateX(-50%)",width:"100%",maxWidth:430,background:"rgba(5,5,5,.98)",borderTop:"1px solid #1A1A1A",display:"flex",zIndex:300}}>
        {[["home","🏠","HOME"],["catalog","📋","CATALOG"],["services","🔨","SERVICES"],["about","ℹ️","ABOUT"],["contact","📝","REQUEST"]].map(([id,ic,lb])=>(
          <button key={id} onClick={()=>goTab(id)} style={{flex:1,background:"none",border:"none",color:tab===id?OG:"#444",padding:"9px 0 6px",cursor:"pointer",fontSize:8,fontWeight:tab===id?900:500,letterSpacing:.5}}>
            <div style={{fontSize:18,marginBottom:2}}>{ic}</div>{lb}
            {id==="contact"&&basket.length>0&&<div style={{background:OG,borderRadius:99,width:5,height:5,margin:"2px auto 0"}}/>}
          </button>
        ))}
      </nav>
    </div>
  );
}

/* ══ HOME ══ */
function Home({onCat,onReq}){
  return(
    <div>
      <LogoBanner/>
      <div style={{position:"relative",height:220,overflow:"hidden"}}>
        <Img src={I.hero} tex="dark" style={{width:"100%",height:220}}/>
        <div style={{position:"absolute",inset:0,background:"linear-gradient(to bottom,rgba(7,7,7,.5),rgba(7,7,7,.92))"}}/>
        <div style={{position:"absolute",bottom:0,left:0,right:0,padding:"0 18px 22px"}}>
          <div style={{color:GD,fontSize:9,fontWeight:700,letterSpacing:3,marginBottom:7}}>ESTABLISHED 2009 · UAE & GCC</div>
          <h1 style={{color:"#fff",fontSize:21,fontWeight:900,lineHeight:1.2,marginBottom:12}}>Premium Flooring for Homes & Commercial Spaces</h1>
          <div style={{display:"flex",gap:9}}>
            <button onClick={onReq} style={{background:OG,border:"none",color:"#fff",padding:"10px 18px",borderRadius:6,fontSize:11,fontWeight:800,cursor:"pointer"}}>FREE QUOTE →</button>
            <a href="tel:80035667" style={{background:"rgba(255,255,255,.1)",border:"1px solid rgba(255,255,255,.2)",color:"#fff",padding:"10px 14px",borderRadius:6,fontSize:11,fontWeight:600,textDecoration:"none"}}>📞 800 FLOOR</a>
          </div>
        </div>
      </div>
      <div style={{background:OG,display:"flex",overflowX:"auto"}}>
        {["✓ Free Shipping UAE","✓ Free Samples","✓ Price Match","✓ Free Estimates","✓ 24hr Quote"].map(u=>(
          <div key={u} style={{padding:"8px 15px",fontSize:10,fontWeight:800,color:"#fff",whiteSpace:"nowrap",borderRight:"1px solid rgba(255,255,255,.2)"}}>{u}</div>
        ))}
      </div>
      <div style={{margin:"14px 14px 0",background:"linear-gradient(135deg,#150800,#111)",borderRadius:10,padding:"14px 16px",border:`1px solid ${OG}35`,display:"flex",alignItems:"center",gap:12}}>
        <Img src={I.measure} tex="wood" style={{width:60,height:44,borderRadius:6,flexShrink:0}}/>
        <div style={{flex:1}}><div style={{color:"#fff",fontSize:13,fontWeight:800}}>Free Site Visit & Quote</div><div style={{color:"#777",fontSize:10,marginTop:2}}>Within 24 hours — anywhere in UAE</div></div>
        <button onClick={onReq} style={{background:OG,border:"none",color:"#fff",padding:"10px 14px",borderRadius:6,fontSize:11,fontWeight:800,cursor:"pointer",flexShrink:0}}>BOOK →</button>
      </div>
      <div style={{padding:"18px 14px 0"}}>
        <ST>BROWSE BY PRODUCT TYPE</ST>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
          {cats.map(c=>(
            <div key={c.id} onClick={()=>onCat(c)} style={{borderRadius:8,overflow:"hidden",cursor:"pointer",border:"1px solid #1C1C1C",background:C1}}>
              <div style={{height:110,position:"relative",overflow:"hidden"}}>
                <Img src={c.img} tex={c.tex} style={{width:"100%",height:110}}/>
                <div style={{position:"absolute",inset:0,background:"linear-gradient(to bottom,rgba(0,0,0,.05) 0%,rgba(0,0,0,.85) 100%)"}}/>
                <div style={{position:"absolute",bottom:0,left:0,right:0,padding:"0 10px 9px"}}>
                  <div style={{color:"#fff",fontSize:11,fontWeight:800,lineHeight:1.3}}>{c.emoji} {c.name}</div>
                </div>
              </div>
              <div style={{padding:"7px 10px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                <div style={{color:OG,fontSize:9,fontWeight:800}}>{c.subs.length>0?`${c.subs.length} COLLECTIONS`:"SPECIAL OFFERS"}</div>
                <div style={{color:"#333",fontSize:14}}>›</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div style={{padding:"18px 0 0"}}>
        <div style={{padding:"0 14px"}}><ST>REAL INSTALLATIONS · UAE & GCC</ST></div>
        <div style={{display:"flex",gap:10,overflowX:"auto",padding:"0 14px 4px"}}>
          {projects.map(p=>(
            <div key={p.label} style={{flexShrink:0,width:140,borderRadius:8,overflow:"hidden",border:"1px solid #1C1C1C"}}>
              <Img src={p.img} tex="dark" style={{width:140,height:95}}/>
              <div style={{padding:"6px 9px",background:C1}}><div style={{color:"#aaa",fontSize:10,fontWeight:600}}>{p.label}</div></div>
            </div>
          ))}
        </div>
      </div>
      <div style={{margin:"16px 14px 0",background:C1,borderRadius:10,padding:14,border:"1px solid #1A1A1A"}}>
        <ST>WHY CHOOSE FLOORWORLD</ST>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
          {[["🏆","Since 2009","UAE's largest flooring co."],["👷","70+ Installers","1-year warranty"],["🇪🇺","European Brands","Royal Parquet · Quick-Step"],["🏪","7 Showrooms","Dubai · AUH · SHJ · RAK +"],["🚚","Free Delivery","UAE on eligible orders"],["📐","Free Measuring","Professional estimation"]].map(([i,t,d])=>(
            <div key={t} style={{background:C2,borderRadius:8,padding:"10px 11px",border:"1px solid #1C1C1C"}}>
              <div style={{fontSize:18,marginBottom:4}}>{i}</div>
              <div style={{color:"#fff",fontSize:11,fontWeight:700}}>{t}</div>
              <div style={{color:"#555",fontSize:9,marginTop:2,lineHeight:1.4}}>{d}</div>
            </div>
          ))}
        </div>
      </div>
      <div style={{margin:"14px 14px 0",borderRadius:10,overflow:"hidden",border:"1px solid #1C1C1C",position:"relative",height:120}}>
        <Img src={I.hero} tex="dark" style={{width:"100%",height:120}}/>
        <div style={{position:"absolute",inset:0,background:"linear-gradient(to right,rgba(0,0,0,.92),rgba(0,0,0,.2))"}}/>
        <div style={{position:"absolute",inset:0,display:"flex",flexDirection:"column",justifyContent:"center",padding:"0 16px"}}>
          <div style={{color:GD,fontSize:9,fontWeight:700,letterSpacing:2,marginBottom:5}}>COMPLETE PROJECT MANAGEMENT</div>
          <div style={{color:"#fff",fontSize:14,fontWeight:900,lineHeight:1.3}}>From Free Estimation to Final Installation</div>
        </div>
      </div>
      <div style={{padding:"14px 14px 8px"}}>
        <ST>CERTIFIED & COMPLIANT</ST>
        <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
          {["FSC Certified","ISO Certified","FloorScore","FIRES","ASCB","QRS"].map(c=>(
            <div key={c} style={{border:"1px solid #1E1E1E",borderRadius:4,padding:"4px 10px",fontSize:9,color:"#555"}}>{c}</div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ══ CATALOG ══ */
function Catalog({onCat}){
  return(
    <div style={{padding:14}}>
      <LogoBanner/><div style={{height:14}}/>
      <ST>ALL PRODUCT CATEGORIES</ST>
      {cats.map(c=>(
        <div key={c.id} onClick={()=>onCat(c)} style={{background:C1,borderRadius:8,marginBottom:9,overflow:"hidden",cursor:"pointer",border:"1px solid #1C1C1C",display:"flex"}}>
          <Img src={c.img} tex={c.tex} style={{width:88,height:80,flexShrink:0}}/>
          <div style={{padding:"11px 13px",flex:1,display:"flex",flexDirection:"column",justifyContent:"center"}}>
            <div style={{color:"#fff",fontSize:13,fontWeight:800}}>{c.emoji} {c.name}</div>
            <div style={{color:"#555",fontSize:10,marginTop:3,lineHeight:1.4}}>{c.desc.substring(0,58)}…</div>
            <div style={{color:OG,fontSize:9,fontWeight:800,marginTop:5}}>{c.subs.length>0?`${c.subs.length} COLLECTIONS ›`:"VIEW OFFERS ›"}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ══ CATEGORY PAGE ══ */
function CatPg({cat,onSub,onReq}){
  return(
    <div>
      <div style={{height:190,position:"relative",overflow:"hidden"}}>
        <Img src={cat.banner||cat.img} tex={cat.tex} style={{width:"100%",height:190}}/>
        <div style={{position:"absolute",inset:0,background:"linear-gradient(to bottom,rgba(0,0,0,.05),rgba(0,0,0,.9))"}}/>
        <div style={{position:"absolute",bottom:16,left:16,right:16}}>
          <div style={{color:GD,fontSize:9,fontWeight:700,letterSpacing:2,marginBottom:4}}>{cat.emoji} FLOORWORLD COLLECTION</div>
          <h2 style={{color:"#fff",fontSize:24,fontWeight:900,margin:0,lineHeight:1.15}}>{cat.name}</h2>
        </div>
      </div>
      <div style={{padding:14}}>
        <p style={{color:"#888",fontSize:12,lineHeight:1.75,marginBottom:16}}>{cat.desc}</p>
        {cat.brands.length>0&&(
          <div style={{background:C1,borderRadius:8,padding:12,marginBottom:16,border:"1px solid #1A1A1A"}}>
            <div style={{color:"#444",fontSize:9,fontWeight:800,letterSpacing:2,marginBottom:8}}>FEATURED BRANDS</div>
            <div style={{display:"flex",flexWrap:"wrap",gap:6}}>
              {cat.brands.map(b=><span key={b} style={{background:C2,border:"1px solid #222",borderRadius:4,padding:"4px 12px",fontSize:10,color:"#bbb",fontWeight:600}}>{b}</span>)}
            </div>
          </div>
        )}
        {cat.subs.length>0&&<>
          <ST>COLLECTIONS</ST>
          {cat.subs.map(s=>(
            <div key={s.id} onClick={()=>onSub(s)} style={{background:C1,borderRadius:8,marginBottom:9,overflow:"hidden",cursor:"pointer",border:"1px solid #1C1C1C",display:"flex"}}>
              <Img src={s.img} tex={s.tex} style={{width:82,height:72,flexShrink:0}}/>
              <div style={{padding:"10px 13px",flex:1,display:"flex",flexDirection:"column",justifyContent:"center"}}>
                <div style={{color:"#fff",fontSize:12,fontWeight:800}}>{s.name}</div>
                <div style={{color:"#555",fontSize:10,marginTop:3,lineHeight:1.4}}>{s.desc.substring(0,55)}…</div>
                {s.products.length>0&&<div style={{color:OG,fontSize:9,fontWeight:800,marginTop:5}}>{s.products.length} PRODUCT{s.products.length>1?"S":""} ›</div>}
              </div>
            </div>
          ))}
        </>}
        {cat.subs.length===0&&(
          <div style={{background:C1,borderRadius:8,overflow:"hidden",border:`1px solid ${OG}35`,marginBottom:16}}>
            <div style={{position:"relative",height:120}}><Img src={cat.img} tex={cat.tex} style={{width:"100%",height:120}}/>
              <div style={{position:"absolute",inset:0,background:"rgba(0,0,0,.6)",display:"flex",alignItems:"center",justifyContent:"center"}}>
                <div style={{textAlign:"center"}}><div style={{fontSize:32}}>🏷️</div><div style={{color:"#fff",fontSize:14,fontWeight:800,marginTop:8}}>Special Clearance Prices</div></div>
              </div>
            </div>
            <div style={{padding:14,color:"#666",fontSize:12,lineHeight:1.6}}>Limited stock of premium European flooring at unbeatable prices. Contact us for current availability.</div>
          </div>
        )}
        <PBtn onClick={onReq}>📝 REQUEST A QUOTE</PBtn>
        <OBtn href="tel:80035667">📞 CALL: 800 FLOOR (35667)</OBtn>
      </div>
    </div>
  );
}

/* ══ SUB PAGE ══ */
function SubPg({sub,cat,onProd,onReq,addS,basket}){
  return(
    <div>
      <div style={{height:165,position:"relative",overflow:"hidden"}}>
        <Img src={sub.img} tex={sub.tex} style={{width:"100%",height:165}}/>
        <div style={{position:"absolute",inset:0,background:"linear-gradient(to bottom,rgba(0,0,0,.05),rgba(0,0,0,.88))"}}/>
        <div style={{position:"absolute",bottom:14,left:16,right:16}}>
          <div style={{color:GD,fontSize:9,fontWeight:700,letterSpacing:2,marginBottom:3}}>{cat.name}</div>
          <h2 style={{color:"#fff",fontSize:20,fontWeight:900,margin:0,lineHeight:1.2}}>{sub.name}</h2>
        </div>
      </div>
      <div style={{padding:14}}>
        <p style={{color:"#888",fontSize:12,lineHeight:1.75,marginBottom:14}}>{sub.desc}</p>
        {sub.products.length>0&&<>
          <ST>PRODUCTS IN THIS COLLECTION</ST>
          {sub.products.map(pr=>{
            const inB=basket.find(b=>b.name===pr.name);
            return(
              <div key={pr.name} style={{background:C1,borderRadius:8,marginBottom:12,overflow:"hidden",border:`1.5px solid ${inB?OG:"#1C1C1C"}`}}>
                <div style={{position:"relative",cursor:"pointer"}} onClick={()=>onProd(pr)}>
                  <Img src={pr.img} tex={pr.tex} style={{width:"100%",height:170}}/>
                  <div style={{position:"absolute",inset:0,background:"linear-gradient(to bottom,rgba(0,0,0,.05) 40%,rgba(0,0,0,.78) 100%)"}}/>
                  <div style={{position:"absolute",bottom:10,left:12,right:12,display:"flex",justifyContent:"space-between",alignItems:"flex-end"}}>
                    <div>
                      <div style={{color:"#fff",fontSize:13,fontWeight:800}}>{pr.name}</div>
                      <div style={{color:GD,fontSize:10,fontWeight:600,marginTop:2}}>{pr.brand}</div>
                    </div>
                    {pr.price&&<div style={{background:OG,color:"#fff",fontSize:10,fontWeight:800,borderRadius:4,padding:"3px 8px"}}>{pr.price}</div>}
                  </div>
                </div>
                <div style={{padding:"11px 12px"}}>
                  <div style={{display:"flex",gap:6,flexWrap:"wrap",marginBottom:10}}>
                    {Object.entries(pr.specs).slice(0,3).map(([k,v])=>(
                      <div key={k} style={{background:C2,borderRadius:5,padding:"5px 9px",border:"1px solid #1C1C1C"}}>
                        <div style={{color:"#444",fontSize:8,letterSpacing:1}}>{k.toUpperCase()}</div>
                        <div style={{color:"#ccc",fontSize:10,fontWeight:700,marginTop:1}}>{v}</div>
                      </div>
                    ))}
                  </div>
                  <div style={{display:"flex",gap:8}}>
                    <button onClick={()=>addS(pr,cat.name,sub.name)} style={{background:inB?"transparent":OG,border:inB?`1.5px solid ${OG}`:"none",color:inB?OG:"#fff",borderRadius:6,padding:"8px 13px",fontSize:9,fontWeight:800,cursor:"pointer",whiteSpace:"nowrap"}}>
                      {inB?"✓ ADDED":"＋ SAMPLE"}
                    </button>
                    <button onClick={()=>onProd(pr)} style={{background:"#1A1A1A",border:"1px solid #282828",color:"#aaa",borderRadius:6,padding:"8px 13px",fontSize:9,fontWeight:700,cursor:"pointer",flex:1}}>
                      FULL SPECS ›
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </>}
        {sub.products.length===0&&<div style={{background:C1,borderRadius:8,padding:16,border:"1px solid #1C1C1C",textAlign:"center",marginBottom:14,color:"#555",fontSize:12,lineHeight:1.6}}>Contact us for full product listings and current availability.</div>}
        <PBtn onClick={onReq}>📝 REQUEST QUOTE FOR THIS COLLECTION</PBtn>
        <OBtn href="tel:80035667">📞 CALL: 800 FLOOR (35667)</OBtn>
      </div>
    </div>
  );
}

/* ══ PRODUCT DETAIL ══ */
function ProdPg({prod,cat,sub,onReq,addS,basket}){
  const inB=basket.find(b=>b.name===prod.name);
  return(
    <div>
      <div style={{position:"relative",height:230,overflow:"hidden"}}>
        <Img src={prod.img} tex={prod.tex} style={{width:"100%",height:230}}/>
        <div style={{position:"absolute",inset:0,background:"linear-gradient(to bottom,rgba(0,0,0,.05) 30%,rgba(0,0,0,.92) 100%)"}}/>
        <div style={{position:"absolute",bottom:16,left:16,right:16}}>
          <div style={{color:GD,fontSize:9,fontWeight:700,letterSpacing:2,marginBottom:4}}>{cat.name} · {sub.name}</div>
          <h2 style={{color:"#fff",fontSize:22,fontWeight:900,margin:0}}>{prod.name}</h2>
          <div style={{display:"flex",alignItems:"center",gap:10,marginTop:5}}>
            <div style={{color:"#999",fontSize:11}}>{prod.brand}</div>
            {prod.price&&<div style={{background:OG,color:"#fff",fontSize:11,fontWeight:800,borderRadius:4,padding:"3px 9px"}}>{prod.price}</div>}
          </div>
        </div>
      </div>
      <div style={{padding:14}}>
        <button onClick={()=>addS(prod,cat.name,sub.name)} style={{width:"100%",background:inB?"transparent":GD,border:inB?`2px solid ${GD}`:"none",color:inB?GD:"#111",borderRadius:8,padding:"12px",fontSize:12,fontWeight:900,cursor:"pointer",marginBottom:14}}>
          {inB?"✓ IN YOUR SAMPLE BASKET":"＋ ADD TO SAMPLE BASKET"}
        </button>
        <div style={{background:C1,borderRadius:8,padding:14,border:"1px solid #1A1A1A",marginBottom:14}}>
          <ST>TECHNICAL SPECIFICATIONS</ST>
          {Object.entries(prod.specs).map(([k,v],i,arr)=>(
            <div key={k} style={{display:"flex",justifyContent:"space-between",padding:"9px 0",borderBottom:i<arr.length-1?"1px solid #161616":"none"}}>
              <div style={{color:"#666",fontSize:11}}>{k}</div>
              <div style={{color:"#fff",fontSize:11,fontWeight:700,textAlign:"right",maxWidth:"58%"}}>{v}</div>
            </div>
          ))}
        </div>
        <div style={{background:C1,borderRadius:8,padding:14,border:"1px solid #1A1A1A",marginBottom:14}}>
          <ST>INCLUDED WITH EVERY ORDER</ST>
          {["Free samples on request","Expert installation by 70+ qualified professionals","1-year installation warranty","Free measuring & estimation","Free UAE delivery on eligible orders","After-sales support & floor care guidance"].map(f=>(
            <div key={f} style={{display:"flex",gap:9,marginBottom:8}}><span style={{color:OG,fontWeight:900,flexShrink:0}}>✓</span><span style={{color:"#aaa",fontSize:11,lineHeight:1.5}}>{f}</span></div>
          ))}
        </div>
        <PBtn onClick={onReq}>📝 REQUEST QUOTE FOR THIS PRODUCT</PBtn>
        <OBtn href="tel:80035667">📞 CALL: 800 FLOOR (35667)</OBtn>
      </div>
    </div>
  );
}

/* ══ SERVICES ══ */
function Svcs({onReq}){
  return(
    <div>
      <div style={{position:"relative",height:145,overflow:"hidden"}}>
        <Img src={I.hero} tex="dark" style={{width:"100%",height:145}}/>
        <div style={{position:"absolute",inset:0,background:"rgba(0,0,0,.78)"}}/>
        <div style={{position:"absolute",inset:0,display:"flex",flexDirection:"column",justifyContent:"center",padding:"0 18px"}}>
          <div style={{color:GD,fontSize:9,fontWeight:700,letterSpacing:2,marginBottom:7}}>COMPLETE FLOORING SOLUTIONS</div>
          <div style={{color:"#fff",fontSize:19,fontWeight:900,lineHeight:1.25}}>From Free Estimation to Final Installation</div>
        </div>
      </div>
      <div style={{padding:14}}>
        {services.map(s=>(
          <div key={s.t} style={{background:C1,borderRadius:8,padding:13,marginBottom:8,border:"1px solid #1A1A1A",display:"flex",gap:12}}>
            <div style={{fontSize:22,flexShrink:0}}>{s.icon}</div>
            <div style={{flex:1}}>
              <div style={{display:"flex",alignItems:"center",gap:7,marginBottom:3,flexWrap:"wrap"}}>
                <div style={{color:"#fff",fontSize:12,fontWeight:800}}>{s.t}</div>
                {s.tag&&<div style={{background:`${OG}20`,color:OG,fontSize:8,fontWeight:800,borderRadius:4,padding:"2px 7px"}}>{s.tag}</div>}
              </div>
              <div style={{color:"#555",fontSize:11,lineHeight:1.5}}>{s.d}</div>
            </div>
          </div>
        ))}
        <PBtn onClick={onReq}>📝 BOOK A FREE SITE VISIT</PBtn>
      </div>
    </div>
  );
}

/* ══ ABOUT ══ */
function Abt({sec,setSec}){
  return(
    <div>
      <LogoBanner/>
      <div style={{display:"flex",background:"#080808",borderBottom:"1px solid #1A1A1A"}}>
        {[["about","ABOUT"],["showrooms","SHOWROOMS"],["brands","BRANDS"],["projects","PROJECTS"]].map(([id,lb])=>(
          <button key={id} onClick={()=>setSec(id)} style={{flex:1,padding:"11px 0",background:"none",border:"none",color:sec===id?OG:"#444",fontSize:9,fontWeight:sec===id?900:500,borderBottom:sec===id?`2px solid ${OG}`:"2px solid transparent",cursor:"pointer",letterSpacing:.5}}>
            {lb}
          </button>
        ))}
      </div>
      <div style={{padding:14}}>
        {sec==="about"&&<>
          <div style={{borderRadius:8,overflow:"hidden",marginBottom:14,position:"relative",height:130}}>
            <Img src={I.hero} tex="dark" style={{width:"100%",height:130}}/>
            <div style={{position:"absolute",inset:0,background:"linear-gradient(to right,rgba(0,0,0,.92),rgba(0,0,0,.25))"}}/>
            <div style={{position:"absolute",inset:0,padding:16,display:"flex",flexDirection:"column",justifyContent:"center"}}>
              <div style={{color:GD,fontSize:9,fontWeight:700,letterSpacing:2,marginBottom:4}}>OUR STORY · SINCE 2009</div>
              <div style={{color:"#fff",fontSize:15,fontWeight:900,lineHeight:1.3}}>Crafting Exceptional Floors Across the GCC</div>
            </div>
          </div>
          <p style={{color:"#777",fontSize:12,lineHeight:1.8,marginBottom:16}}>Founded in 2009, Floorworld has grown to become one of the leading flooring specialists in the UAE. With 7 showrooms spanning Dubai, Abu Dhabi, Sharjah, RAK, Al Ain and Oman, we serve homeowners, contractors and designers with premium European flooring solutions.</p>
          {[["🏆","Our Promise","Premium European flooring, exceptional service, and competitive pricing."],["👷","Our Team","Over 70 fully trained installers with a 1-year installation warranty."],["🌍","Our Reach","Serving homeowners, architects and contractors from Dubai to Oman."],["🎯","Our Mission","Complete flooring solutions from measurement to installation and aftercare."]].map(([i,t,d])=>(
            <div key={t} style={{background:C1,borderRadius:8,padding:13,marginBottom:8,border:"1px solid #1A1A1A",display:"flex",gap:12}}>
              <div style={{fontSize:20,flexShrink:0}}>{i}</div>
              <div><div style={{color:"#fff",fontSize:12,fontWeight:800,marginBottom:3}}>{t}</div><div style={{color:"#555",fontSize:11,lineHeight:1.5}}>{d}</div></div>
            </div>
          ))}
        </>}
        {sec==="showrooms"&&<>
          <div style={{background:C1,borderRadius:8,padding:12,marginBottom:14,border:`1px solid ${OG}30`,display:"flex",gap:10,alignItems:"center"}}>
            <div style={{fontSize:22}}>📞</div>
            <div><div style={{color:"#fff",fontSize:13,fontWeight:800}}>Toll Free: 800 Floor (35667)</div><div style={{color:"#555",fontSize:10,marginTop:2}}>All UAE showrooms</div></div>
          </div>
          {showrooms.map(s=>(
            <div key={s.city} style={{background:C1,borderRadius:8,padding:13,marginBottom:8,border:`1.5px solid ${s.main?OG:"#1A1A1A"}`}}>
              <div style={{color:"#fff",fontSize:12,fontWeight:800}}>📍 {s.city}{s.main&&<span style={{background:`${OG}22`,color:OG,fontSize:8,fontWeight:800,borderRadius:4,padding:"2px 7px",marginLeft:7}}>HEAD OFFICE</span>}</div>
              <div style={{color:"#555",fontSize:11,marginTop:4}}>{s.addr}</div>
              <div style={{color:OG,fontSize:10,fontWeight:700,marginTop:5}}>{s.ph}</div>
            </div>
          ))}
        </>}
        {sec==="brands"&&<>
          <ST>EUROPEAN & GLOBAL PARTNER BRANDS</ST>
          {[{n:"Royal Parquet",c:"Engineered Wood · Parquet",src:I.oxford,tx:"wood"},
            {n:"SwissHardwood",c:"Engineered Wood",src:I.windsor,tx:"wood"},
            {n:"Gerbür",c:"Laminate · Vinyl · SPC",src:I.hydroBed,tx:"lam"},
            {n:"Quick-Step",c:"Laminate · Vinyl",src:I.hydroW,tx:"lam"},
            {n:"BerryAlloc",c:"Vinyl Flooring",src:I.vClick,tx:"vinyl"},
            {n:"Mohawk Group",c:"Carpet Tiles",src:I.carpet,tx:"carpet"},
            {n:"British Carpet Mills",c:"Carpets & Tiles",src:I.carpet,tx:"carpet"},
            {n:"Lano · Balta · Standard Carpets",c:"Carpets",src:I.carpet,tx:"carpet"}].map(b=>(
            <div key={b.n} style={{background:C1,borderRadius:8,marginBottom:7,overflow:"hidden",border:"1px solid #1A1A1A",display:"flex",alignItems:"center"}}>
              <Img src={b.src} tex={b.tx} style={{width:65,height:50,flexShrink:0}}/>
              <div style={{padding:"8px 13px"}}>
                <div style={{color:"#fff",fontSize:12,fontWeight:800}}>{b.n}</div>
                <div style={{color:OG,fontSize:9,fontWeight:700,marginTop:2}}>{b.c}</div>
              </div>
            </div>
          ))}
        </>}
        {sec==="projects"&&<>
          <div style={{borderRadius:8,overflow:"hidden",marginBottom:14,border:"1px solid #1A1A1A"}}>
            <div style={{height:95,position:"relative",overflow:"hidden"}}>
              <Img src={I.woodMain} tex="wood" style={{width:"100%",height:95}}/>
              <div style={{position:"absolute",inset:0,background:"rgba(0,0,0,.65)",display:"flex",alignItems:"center",padding:"0 16px"}}>
                <div><div style={{color:GD,fontSize:9,fontWeight:700,letterSpacing:2,marginBottom:4}}>REAL PROJECTS · REAL INSPIRATION</div>
                  <div style={{color:"#fff",fontSize:13,fontWeight:800}}>Villas · Apartments · Hotels · Offices · Outdoors</div></div>
              </div>
            </div>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:9,marginBottom:14}}>
            {projects.map(p=>(
              <div key={p.label} style={{borderRadius:8,overflow:"hidden",border:"1px solid #1C1C1C"}}>
                <Img src={p.img} tex="dark" style={{width:"100%",height:100}}/>
                <div style={{padding:"7px 9px",background:C1}}><div style={{color:"#bbb",fontSize:10,fontWeight:600}}>{p.label}</div></div>
              </div>
            ))}
          </div>
        </>}
      </div>
    </div>
  );
}

/* ══ CONTACT ══ */
function Ctct({form,setF,sent,setSent,basket,remS}){
  const sub=()=>{if(!form.name||!form.phone){alert("Please enter name & phone.");return;}setSent(true);};
  if(sent) return(
    <div style={{padding:32,textAlign:"center"}}>
      <div style={{width:64,height:64,background:`${OG}20`,borderRadius:99,display:"flex",alignItems:"center",justifyContent:"center",fontSize:28,margin:"0 auto 16px"}}>✅</div>
      <div style={{color:OG,fontSize:16,fontWeight:900}}>REQUEST SUBMITTED!</div>
      <p style={{color:"#777",fontSize:12,marginTop:10,lineHeight:1.8}}>Thank you, <b style={{color:"#fff"}}>{form.name}</b>! A Floorworld specialist will contact you within 24 hours.</p>
      {basket.length>0&&<div style={{background:C1,borderRadius:8,padding:13,marginTop:14,border:"1px solid #1A1A1A",textAlign:"left"}}>
        <div style={{color:"#444",fontSize:9,fontWeight:800,marginBottom:8,letterSpacing:1.5}}>SAMPLES REQUESTED</div>
        {basket.map(b=><div key={b.name} style={{color:"#ccc",fontSize:11,padding:"5px 0",borderBottom:"1px solid #141414",display:"flex",gap:8}}><span style={{color:OG}}>✓</span>{b.name}</div>)}
      </div>}
      <div style={{background:C1,borderRadius:8,padding:14,marginTop:14,border:"1px solid #1A1A1A"}}>
        <a href="tel:80035667" style={{display:"block",color:OG,fontSize:16,fontWeight:900,textDecoration:"none",marginBottom:4}}>📞 800 Floor (35667)</a>
        <div style={{color:"#444",fontSize:10}}>info@floorworld.com</div>
      </div>
      <button onClick={()=>setSent(false)} style={{background:"none",border:"1px solid #1E1E1E",color:"#555",padding:"9px 22px",borderRadius:6,marginTop:14,cursor:"pointer",fontSize:11}}>Submit Another Request</button>
    </div>
  );
  return(
    <div style={{padding:14}}>
      <div style={{borderRadius:8,overflow:"hidden",marginBottom:16,position:"relative",height:90}}>
        <Img src={I.hero} tex="dark" style={{width:"100%",height:90}}/>
        <div style={{position:"absolute",inset:0,background:"rgba(0,0,0,.78)",display:"flex",flexDirection:"column",justifyContent:"center",padding:"0 16px"}}>
          <div style={{color:GD,fontSize:9,fontWeight:700,letterSpacing:2,marginBottom:4}}>BOOK A FREE SITE VISIT</div>
          <div style={{color:"#fff",fontSize:16,fontWeight:900}}>Request a Quote</div>
        </div>
      </div>
      {basket.length>0&&(
        <div style={{background:C1,borderRadius:8,padding:12,marginBottom:14,border:`1px solid ${OG}35`}}>
          <div style={{color:OG,fontSize:9,fontWeight:800,marginBottom:9,letterSpacing:1.3}}>🧺 SAMPLE BASKET ({basket.length})</div>
          {basket.map(b=>(
            <div key={b.name} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"6px 0",borderBottom:"1px solid #141414"}}>
              <div><div style={{color:"#fff",fontSize:11,fontWeight:700}}>{b.name}</div><div style={{color:"#444",fontSize:9,marginTop:1}}>{b.cat}</div></div>
              <button onClick={()=>remS(b.name)} style={{background:"none",border:"none",color:"#333",fontSize:20,cursor:"pointer",lineHeight:1}}>×</button>
            </div>
          ))}
        </div>
      )}
      <label style={lbl}>FULL NAME *</label>
      <input style={inp} placeholder="Your full name" value={form.name} onChange={e=>setF("name",e.target.value)}/>
      <label style={lbl}>PHONE NUMBER *</label>
      <input style={inp} placeholder="+971 50 000 0000" value={form.phone} onChange={e=>setF("phone",e.target.value)}/>
      <label style={lbl}>EMAIL ADDRESS</label>
      <input style={inp} placeholder="your@email.com" value={form.email} onChange={e=>setF("email",e.target.value)}/>
      <label style={lbl}>TYPE OF SPACE</label>
      <select style={{...inp,appearance:"none"}} value={form.space} onChange={e=>setF("space",e.target.value)}>
        <option value="">Select space type…</option>
        {["Apartment","Villa / House","Penthouse","Office","Retail / Shop","Hotel / Hospitality","Government Building","Commercial / Industrial","Outdoor Area","Other"].map(s=><option key={s} value={s}>{s}</option>)}
      </select>
      <label style={lbl}>APPROXIMATE AREA (sqm)</label>
      <input style={inp} placeholder="e.g. 200 sqm" value={form.area} onChange={e=>setF("area",e.target.value)}/>
      <label style={lbl}>ADDITIONAL NOTES</label>
      <textarea style={{...inp,height:78,resize:"none"}} placeholder="Preferred colours, finish, timeline…" value={form.notes} onChange={e=>setF("notes",e.target.value)}/>
      <PBtn onClick={sub}>SUBMIT REQUEST →</PBtn>
      <div style={{background:C1,borderRadius:8,padding:13,marginTop:10,border:"1px solid #1A1A1A",textAlign:"center"}}>
        <div style={{color:"#444",fontSize:9,fontWeight:800,letterSpacing:1.5,marginBottom:6}}>PREFER TO CALL?</div>
        <a href="tel:80035667" style={{color:OG,fontSize:17,fontWeight:900,textDecoration:"none"}}>📞 800 Floor (35667)</a>
        <div style={{color:"#333",fontSize:9,marginTop:4}}>Toll Free · Dubai, UAE</div>
      </div>
    </div>
  );
}

const ST=({children})=><div style={{color:"#444",fontSize:9,fontWeight:800,letterSpacing:2.5,marginBottom:12,textTransform:"uppercase"}}>{children}</div>;
const PBtn=({onClick,children})=><button onClick={onClick} style={{width:"100%",background:OG,border:"none",color:"#fff",padding:14,borderRadius:8,fontSize:13,fontWeight:900,cursor:"pointer",letterSpacing:.5}}>{children}</button>;
const OBtn=({href,children})=><a href={href} style={{display:"block",textAlign:"center",margin:"9px 0 0",border:`1.5px solid ${OG}`,color:OG,padding:13,borderRadius:8,fontSize:12,fontWeight:800,textDecoration:"none"}}>{children}</a>;
