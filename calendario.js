/* Calendário educativo SST. Mês e relógio locais, sem envio de dados ou APIs. */
(() => {
  'use strict';
  const $ = id => document.getElementById(id);
  const campaigns = [
    {name:'Janeiro Branco',desc:'Campanha de conscientização sobre saúde mental, diálogo, acolhimento e ambientes de trabalho psicologicamente saudáveis.',theme:'mental',url:'https://www.gov.br/saude/pt-br'},
    {name:'Fevereiro Roxo',desc:'Conscientização sobre condições crônicas e importância do diagnóstico e acompanhamento de saúde.',theme:'roxo',url:'https://www.gov.br/saude/pt-br'},
    {name:'Março Lilás',desc:'Conscientização sobre prevenção do câncer do colo do útero e cuidados com a saúde.',theme:'lilas',url:'https://www.gov.br/saude/pt-br'},
    {name:'Abril Verde',desc:'Mês de mobilização pela prevenção de acidentes e doenças relacionadas ao trabalho; destaque para 28 de abril.',theme:'verde',url:'https://bvsms.saude.gov.br/garantir-ambientes-de-trabalho-saudaveis-e-bem-estar-psicossocial-28-4-dia-mundial-da-seguranca-e-saude-no-trabalho-dia-nacional-em-memoria-das-vitimas-de-acidentes-e-d/'},
    {name:'Maio Amarelo',desc:'Movimento de conscientização para um trânsito mais seguro, inclusive nos deslocamentos e transportes de trabalho.',theme:'amarelo',url:'https://www.gov.br/transportes/pt-br'},
    {name:'Junho Vermelho',desc:'Conscientização sobre a doação de sangue e solidariedade com a saúde coletiva.',theme:'vermelho',url:'https://www.gov.br/saude/pt-br'},
    {name:'Julho Amarelo',desc:'Mês de atenção às hepatites virais: informação, diagnóstico e prevenção.',theme:'amarelo',url:'https://www.gov.br/saude/pt-br'},
    {name:'Agosto Dourado',desc:'Promoção e apoio ao aleitamento materno e saúde de mães e crianças.',theme:'dourado',url:'https://www.gov.br/saude/pt-br'},
    {name:'Setembro Amarelo',desc:'Valorização da vida, promoção da saúde mental e estímulo ao apoio profissional.',theme:'amarelo',url:'https://www.gov.br/saude/pt-br'},
    {name:'Outubro Rosa',desc:'Mês de conscientização sobre o câncer de mama. Na SST, a campanha inspira cuidado, informação e apoio à saúde das trabalhadoras.',theme:'rosa',url:'https://www.gov.br/saude/pt-br/assuntos/saude-de-a-a-z/c/calendario/saude/outubro'},
    {name:'Novembro Azul',desc:'Campanha de atenção à saúde do homem e cuidados preventivos baseados em orientações de profissionais de saúde.',theme:'azul',url:'https://www.gov.br/saude/pt-br'},
    {name:'Dezembro Vermelho',desc:'Conscientização para prevenção do HIV e outras infecções sexualmente transmissíveis, com respeito e sem estigma.',theme:'vermelho',url:'https://www.gov.br/saude/pt-br'}
  ];
  // Eventos de data fixa, com descrições sucintas. Outros eventos podem ter data móvel.
  const events = {
    '1-25': ['Dia Mundial de Combate à Hanseníase (data aproximada)', 'A data é móvel (último domingo de janeiro): consulte o calendário do Ministério da Saúde.'],
    '2-4': ['Dia Mundial do Câncer','Prevenção, informação e acesso à assistência.'],
    '3-20': ['Dia Mundial da Saúde Bucal','Incentivo a hábitos saudáveis e cuidados preventivos.'],
    '4-7': ['Dia Mundial da Saúde','Saúde física, mental e coletiva também faz parte do cuidado no trabalho.'],
    '4-28': ['Dia Mundial da Segurança e Saúde no Trabalho','Prevenção de acidentes e doenças ocupacionais e memória das vítimas de acidentes e doenças do trabalho.'],
    '5-1': ['Dia do Trabalhador','Dignidade e saúde também são pilares do trabalho decente.'],
    '5-31': ['Dia Mundial sem Tabaco','Prevenção dos danos associados ao consumo e exposição ao tabaco.'],
    '6-14': ['Dia Mundial do Doador de Sangue','Valorize a solidariedade e os serviços de hemoterapia.'],
    '7-28': ['Dia Mundial de Luta contra as Hepatites Virais','Conscientização, testagem e prevenção.'],
    '8-5': ['Dia Nacional da Saúde','Promoção da saúde e autocuidado em todos os ambientes.'],
    '9-10': ['Dia Mundial de Prevenção do Suicídio','Acolhimento e redes de apoio; buscar ajuda profissional quando necessário.'],
    '9-21': ['Dia Mundial da Doença de Alzheimer','Informação, acolhimento e cuidado digno.'],
    '10-10': ['Dia Mundial da Saúde Mental / Segurança e Saúde nas Escolas','A data também é o Dia Nacional de Segurança e de Saúde nas Escolas, conforme Lei nº 12.645/2012.'],
    '10-19': ['Dia Mundial de Combate ao Câncer de Mama','Conscientização sobre saúde da mama e cuidado orientado.'],
    '10-20': ['Dia Mundial e Nacional da Osteoporose','Cuidados com a saúde óssea, prevenção de quedas e hábitos saudáveis.'],
    '10-29': ['Dia Mundial do AVC','Conheça sinais de alerta e procure atendimento de urgência.'],
    '11-14': ['Dia Mundial do Diabetes','Informação, prevenção e atenção à saúde.'],
    '11-27': ['Dia do Técnico de Segurança do Trabalho','Valorização da formação, inspeção e promoção da prevenção.'],
    '12-1': ['Dia Mundial de Luta contra a AIDS','Prevenção, informação e combate ao estigma.'],
    '12-10': ['Dia dos Direitos Humanos','Ambientes de trabalho seguros e dignos para todas as pessoas.']
  };
  // Janeiro: evitar marcar evento de data móvel como fixa.
  delete events['1-25'];
  const dateFmt = new Intl.DateTimeFormat('pt-BR',{dateStyle:'full'});
  const clockFmt = new Intl.DateTimeFormat('pt-BR',{hour:'2-digit',minute:'2-digit',second:'2-digit'});
  const monthFmt = new Intl.DateTimeFormat('pt-BR',{month:'long',year:'numeric'});
  const now = new Date();
  let displayed = new Date(now.getFullYear(),now.getMonth(),1);
  function updateClock(){ const time=new Date(); const el=$('live-datetime');el.textContent=`${dateFmt.format(time)} · ${clockFmt.format(time)}`;el.dateTime=time.toISOString(); }
  updateClock();
  // Um relógio por segundo, sem conexões externas.
  window.setInterval(updateClock,1000);
  function render(){
    const year=displayed.getFullYear(),month=displayed.getMonth(),camp=campaigns[month];
    const spotlight=document.querySelector('.campaign-spotlight');
    spotlight.dataset.theme=camp.theme;
    $('campaign-overline').textContent='CAMPANHA DO MÊS · '+monthFmt.format(displayed).toLocaleUpperCase('pt-BR');
    $('campaign-title').textContent=camp.name;
    $('campaign-desc').textContent=camp.desc;
    $('campaign-link').href=camp.url;
    $('month-label').textContent=monthFmt.format(displayed);
    const days=$('calendar-days');days.replaceChildren();
    for(let x=0;x<new Date(year,month,1).getDay();x++){
      const blank=document.createElement('span');blank.className='calendar-blank';blank.setAttribute('aria-hidden','true');days.append(blank);
    }
    const count=new Date(year,month+1,0).getDate();
    for(let n=1;n<=count;n++){
      const event=events[`${month+1}-${n}`];
      const today=year===now.getFullYear()&&month===now.getMonth()&&n===now.getDate();
      const day=document.createElement('button');day.type='button';day.textContent=String(n);
      day.className='calendar-day'+(today?' is-today':'')+(event?' has-event':'');
      day.setAttribute('aria-label',`${n} de ${monthFmt.format(displayed)}${event?' — '+event[0]:''}`);
      day.title=event?event[0]:'Dia sem evento destacado';
      day.addEventListener('click',()=>{
        days.querySelectorAll('button').forEach(b=>b.setAttribute('aria-pressed','false'));
        day.setAttribute('aria-pressed','true');
        $('calendar-detail').textContent=event?`${n}/${String(month+1).padStart(2,'0')} — ${event[0]}. ${event[1]}`:`${n}/${String(month+1).padStart(2,'0')} — Sem data específica selecionada. Campanha do mês: ${camp.name}.`;
      });
      day.setAttribute('aria-pressed','false');days.append(day);
    }
    $('calendar-detail').textContent='Selecione um dia destacado para ver a data de conscientização.';
  }
  $('month-prev').addEventListener('click',()=>{displayed=new Date(displayed.getFullYear(),displayed.getMonth()-1,1);render();});
  $('month-next').addEventListener('click',()=>{displayed=new Date(displayed.getFullYear(),displayed.getMonth()+1,1);render();});
  $('month-today').addEventListener('click',()=>{const d=new Date();displayed=new Date(d.getFullYear(),d.getMonth(),1);render();});
  render();
})();
