/* Simulado educativo SST: 50 questões originais, correção e revisão local. */
(() => {
  'use strict';
  const $ = id => document.getElementById(id);
  const all = Array.isArray(window.SST_QUESTOES) ? window.SST_QUESTOES : [];
  const categoryNames = {fisico:'Risco físico',quimico:'Risco químico',biologico:'Risco biológico',ergonomico:'Risco ergonômico',acidente:'Risco de acidentes'};
  if (all.length < 40) {
    $('quiz-intro').querySelector('p').textContent='Não foi possível carregar as questões. Verifique se o arquivo questoes.js está na mesma pasta.';
    $('start-quiz').disabled=true;
    return;
  }
  let questions=[], current=0, score=0, marked=[], started=0, interval=null;
  const randomize = input => {
    const result=input.slice();
    for(let i=result.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[result[i],result[j]]=[result[j],result[i]];}
    return result;
  };
  const formattedTime = milliseconds => { const sec=Math.max(0,Math.floor(milliseconds/1000));return `${String(Math.floor(sec/60)).padStart(2,'0')}:${String(sec%60).padStart(2,'0')}`; };
  function start(){
    questions=randomize(all);current=0;score=0;marked=[];started=Date.now();
    $('quiz-intro').hidden=true;$('quiz-finish').hidden=true;$('quiz-playing').hidden=false;
    if(interval!==null)clearInterval(interval);
    interval=setInterval(()=>{ $('quiz-timer').textContent=formattedTime(Date.now()-started);},1000);
    $('quiz-timer').textContent='00:00';render();
  }
  function render(){
    const item=questions[current];
    $('quiz-position').textContent=`Questão ${current+1} de ${questions.length}`;
    $('quiz-score').textContent=`${score} ${score===1?'acerto':'acertos'}`;
    $('quiz-progress').setAttribute('aria-valuemax',String(questions.length));
    $('quiz-progress').setAttribute('aria-valuenow',String(current));
    $('quiz-progress-fill').style.width=`${100*current/questions.length}%`;
    $('quiz-topic').textContent=`${categoryNames[item.category]||item.category} · ${item.nr}`;
    $('quiz-topic').className=`quiz-topic risk-${item.category}`;
    $('quiz-question').textContent=item.question;
    $('quiz-answers').replaceChildren();
    item.options.forEach((option,index)=>{
      const label=document.createElement('label'); label.className='quiz-option';
      const input=document.createElement('input');input.type='radio';input.name='answer';input.value=String(index);input.required=true;
      const letter=document.createElement('span');letter.className='option-letter';letter.textContent='ABCD'[index];
      const text=document.createElement('span');text.textContent=option;
      label.append(input,letter,text);$('quiz-answers').append(label);
    });
    $('quiz-check').hidden=false;$('quiz-next').hidden=true;$('quiz-feedback').hidden=true;
    $('quiz-form').hidden=false;
    $('quiz-question').focus({preventScroll:true});
  }
  $('quiz-form').addEventListener('submit',event=>{
    event.preventDefault();
    if(marked.length!==current) return;
    const selection=$('quiz-answers').querySelector('input:checked');
    if(!selection){$('quiz-answers').querySelector('input').focus();return;}
    const item=questions[current],answer=Number(selection.value),correct=answer===item.correct;
    marked.push({id:item.id,category:item.category,selected:answer,correct});
    if(correct)score++;
    $('quiz-answers').querySelectorAll('input').forEach(input=>{
      input.disabled=true;
      const label=input.closest('label');
      if(Number(input.value)===item.correct)label.classList.add('is-correct');
      else if(Number(input.value)===answer&&!correct)label.classList.add('is-wrong');
    });
    const feedback=$('quiz-feedback');feedback.replaceChildren();
    const heading=document.createElement('strong');heading.textContent=correct?'✓ Resposta correta!':'↗ Vamos revisar a situação.';
    const body=document.createElement('p');body.textContent=item.explanation;
    feedback.className='quiz-feedback'+(correct?'':' needs-review');feedback.append(heading,body);
    feedback.hidden=false;
    $('quiz-check').hidden=true;
    $('quiz-next').textContent=current===questions.length-1?'Concluir e ver resultado →':'Próxima questão →';
    $('quiz-next').hidden=false;
    $('quiz-score').textContent=`${score} ${score===1?'acerto':'acertos'}`;
    $('quiz-progress').setAttribute('aria-valuenow',String(current+1));
    $('quiz-progress-fill').style.width=`${100*(current+1)/questions.length}%`;
    feedback.scrollIntoView({block:'nearest',behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});
  });
  $('quiz-next').addEventListener('click',()=>{
    if(marked.length!==current+1)return;
    current++;
    if(current===questions.length)finish();else render();
  });
  function finish(){
    if(interval!==null){clearInterval(interval);interval=null;}
    $('quiz-playing').hidden=true;$('quiz-finish').hidden=false;
    const percentage=Math.round(score/questions.length*100);
    $('result-score').textContent=`${percentage}%`;
    $('result-summary').textContent=`${score} acertos em ${questions.length} questões. Duração: ${formattedTime(Date.now()-started)}. Consulte as áreas e as questões que precisam de revisão.`;
    const results=$('result-grid');results.replaceChildren();
    Object.keys(categoryNames).forEach(cat=>{
      const list=marked.filter(item=>item.category===cat);
      const correct=list.filter(item=>item.correct).length;
      const box=document.createElement('div');box.className='topic-result';
      const label=document.createElement('span');label.className=`risk-mini risk-${cat}`;label.textContent=categoryNames[cat];
      const count=document.createElement('strong');count.textContent=`${correct}/${list.length}`;
      box.append(label,count);results.append(box);
    });
    const review=$('quiz-review');review.replaceChildren();
    const wrong=marked.filter(item=>!item.correct);
    if(wrong.length===0){const note=document.createElement('p');note.textContent='Parabéns: todas as respostas foram corretas. Continue revisando as normas oficiais!';review.append(note);}
    wrong.forEach((item,i)=>{
      const q=questions.find(question=>question.id===item.id);
      const details=document.createElement('details');details.className='review-item';
      const summary=document.createElement('summary');summary.textContent=`${i+1}. ${q.question}`;
      const chosen=document.createElement('p');chosen.textContent=`Sua resposta: ${q.options[item.selected]}`;
      const right=document.createElement('p');right.textContent=`Resposta correta: ${q.options[q.correct]}`;
      const reason=document.createElement('p');reason.textContent=q.explanation;
      details.append(summary,chosen,right,reason);review.append(details);
    });
    $('quiz-finish').scrollIntoView({behavior:'auto',block:'start'});
  }
  $('start-quiz').addEventListener('click',start);
  $('quiz-restart').addEventListener('click',start);
})();
