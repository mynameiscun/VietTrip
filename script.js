/* Motion is strictly on the PHOTO, not on vector text or panels.
   Passive scrolling + requestAnimationFrame; disabled when reduced motion is requested. */
(()=>{
 'use strict';
 const $=s=>document.querySelector(s);
 const desktop=$('#desktopSite');
 const mobile=$('#mobileSite');
 const scenes=Array.from(document.querySelectorAll('.fidelity-canvas .photo-scene'));
 const mScenes=Array.from(document.querySelectorAll('.mobile-site .m-scene'));
 const progress=$('#progressFill');
 const nav=$('#stickyNav');
 const reduced=window.matchMedia('(prefers-reduced-motion: reduce)');
 const mobileMQ=window.matchMedia('(max-width:760px)');
 const clamp=(v,min,max)=>Math.min(max,Math.max(min,v));
 let scheduled=false,lastY=window.scrollY,easedY=window.scrollY;
 function frame(){
  scheduled=false;
  const y=window.scrollY;
  easedY+=(y-easedY)*(reduced.matches?1:.17);
  if(Math.abs(y-easedY)<.18)easedY=y;
  const viewport=innerHeight,docHeight=Math.max(1,document.documentElement.scrollHeight-viewport);
  progress.style.transform=`scaleX(${clamp(y/docHeight,0,1)})`;
  const isMobile=mobileMQ.matches;
  if(!isMobile)nav.classList.toggle('shown',y>scenes[0].clientHeight*.92);
  if(!reduced.matches){
   for(const scene of (isMobile?mScenes:scenes)){
    const rect=scene.getBoundingClientRect();
    if(rect.bottom < -viewport*.4 || rect.top>viewport*1.4)continue;
    // 0 at scene center; up to ~18 px desktop at boundary, foreground remains fixed.
    const center=rect.top+y-easedY+rect.height*.5;
    const progressLocal=clamp((viewport*.5-center)/(rect.height+viewport),-.5,.5);
    if(isMobile)scene.style.setProperty('--m-shift',`${(progressLocal*18).toFixed(2)}px`);
    else scene.style.setProperty('--shift',`${(progressLocal*parseFloat(scene.style.getPropertyValue('--strength'))*Math.min(rect.height,viewport)*2).toFixed(2)}px`);
   }
  }
  if(Math.abs(y-easedY)>.18)requestFrame();
  lastY=y;
 }
 function requestFrame(){if(!scheduled){scheduled=true;requestAnimationFrame(frame)}}
 window.addEventListener('scroll',requestFrame,{passive:true});
 window.addEventListener('resize',()=>{easedY=scrollY;requestFrame()},{passive:true});
 reduced.addEventListener?.('change',()=>{if(reduced.matches){for(const s of scenes)s.style.setProperty('--shift','0px');for(const s of mScenes)s.style.setProperty('--m-shift','0px')}requestFrame()});
 requestFrame();

 const hamburger=$('#hamburger'),mnav=$('#mobileNav');
 function closeMobile(){mnav.classList.remove('open');mnav.inert=true;hamburger.setAttribute('aria-expanded','false');hamburger.setAttribute('aria-label','Mở menu')}
 hamburger.addEventListener('click',()=>{
  const open=!mnav.classList.contains('open');mnav.classList.toggle('open',open);mnav.inert=!open;
  hamburger.setAttribute('aria-expanded',String(open));hamburger.setAttribute('aria-label',open?'Đóng menu':'Mở menu');
 });
 mnav.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMobile));

 const dialog=$('#contactDialog'),form=$('#consultForm');
 function closeDialog(){if(dialog.open)dialog.close()}
 document.querySelectorAll('[data-contact]').forEach(b=>b.addEventListener('click',()=>{
  closeMobile();if(typeof dialog.showModal==='function')dialog.showModal();
  else window.location.href='mailto:dulichviettravel8@gmail.com?subject=Tu%20van%20tour%20Viettrip';
 }));
 $('[data-close]').addEventListener('click',closeDialog);
 dialog.addEventListener('click',e=>{if(e.target===dialog)closeDialog()});
 document.addEventListener('keydown',e=>{if(e.key==='Escape')closeMobile()});
 form.addEventListener('submit',e=>{
  e.preventDefault();if(!form.reportValidity())return;
  const values=new FormData(form);
  const fullname=String(values.get('fullName')||'').trim();
  const phone=String(values.get('phone')||'').trim();
  const message=String(values.get('message')||'').trim();
  const subject=encodeURIComponent(`Tư vấn tour Viettrip - ${fullname}`);
  const body=encodeURIComponent(`Xin chào Viettrip,\n\nTôi muốn được tư vấn tour trải nghiệm văn hóa Tây Nguyên.\nHọ và tên: ${fullname}\nSố điện thoại: ${phone||'Chưa cung cấp'}\nNhu cầu: ${message||'Lịch khởi hành, giá tour và dịch vụ bao gồm.'}\n\nTrân trọng.`);
  closeDialog();window.location.href=`mailto:dulichviettravel8@gmail.com?subject=${subject}&body=${body}`;
 });
})();
