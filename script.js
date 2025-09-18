
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('eventForm');
    const progress = document.getElementById('progress');
    if(form && progress){
      const requiredEls = form.querySelectorAll('[required]');
      function updateProgress(){
        let filled=0;
        requiredEls.forEach(el=>{if(el.value.trim()!=='') filled++;});
        const pct=Math.round((filled/requiredEls.length)*100);
        progress.value=pct; progress.innerText=pct+'%';
      }
      form.addEventListener('input',updateProgress);
      form.addEventListener('change',updateProgress);
      updateProgress();
      form.addEventListener('submit',e=>{
        if(!form.checkValidity()){e.preventDefault();form.reportValidity();return;}
        e.preventDefault();alert('Registration submitted — demo mode.');
      });
    }
  
    const bmiBtn=document.getElementById('bmiCalc');
    if(bmiBtn){
      bmiBtn.addEventListener('click',()=>{
        const h=parseFloat(document.getElementById('height').value);
        const w=parseFloat(document.getElementById('weight').value);
        const out=document.getElementById('bmiResult');
        if(!h||!w){out.textContent='Please enter height and weight.';return;}
        const bmi=w/Math.pow(h/100,2);
        const rounded=Math.round(bmi*10)/10;
        let cat=bmi<18.5?'Underweight':bmi<25?'Normal':bmi<30?'Overweight':'Obese';
        out.textContent=`BMI: ${rounded} — ${cat}`;
      });
    }
  
    const photo=document.getElementById('photo');
    if(photo){
      photo.addEventListener('change',()=>{
        const f=photo.files[0];if(!f)return;
        const allowed=['image/png','image/jpeg','image/webp','image/gif'];
        if(!allowed.includes(f.type)){alert('Only image files allowed.');photo.value='';}
      });
    }
  });
  
  jQuery(function($){
    const rates={INR_USD:0.012,INR_EUR:0.011,USD_INR:84,USD_EUR:0.92,EUR_INR:91,EUR_USD:1.09};
    function convert(){
      const amount=parseFloat($('#amount').val())||0;
      const from=$('#fromCurr').val(); const to=$('#toCurr').val();
      if(from===to) return $('#convResult').text('Converted: '+amount.toFixed(2)+' '+to);
      const key=from+'_'+to;
      if(rates[key]) $('#convResult').text('Converted: '+(amount*rates[key]).toFixed(2)+' '+to);
      else $('#convResult').text('Rate unavailable');
    }
    $('#amount').on('keyup',convert);
    $('#fromCurr,#toCurr').on('change',convert);
    convert();
  });
  