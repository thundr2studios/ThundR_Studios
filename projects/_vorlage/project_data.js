/** VORLAGE: Hier neue Inhalte / Sections eintragen. */
window.PROJECT_DATA = {
  serverAddress: '', // leer lassen, falls dein Projekt keinen Server hat
  minecraftVersion: '',
  highlights: [
    {value:'01',label:{de:'PROJEKT',en:'PROJECT'}},
    {value:'02',label:{de:'IDEEN',en:'IDEAS'}},
    {value:'03',label:{de:'FEATURES',en:'FEATURES'}},
    {value:'04',label:{de:'UPDATES',en:'UPDATES'}}
  ],
  sections: [
    {id:'features',type:'cards',enabled:true,label:{de:'01 / FEATURES',en:'01 / FEATURES'},
      title:{de:'MEINE<br><em>FEATURES.</em>',en:'MY<br><em>FEATURES.</em>'},
      intro:{de:'Beschreibung meiner Features',en:'Description of my features'},
      items:[
        {icon:'⚙',number:'01',title:{de:'Feature Eins',en:'Feature One'},text:{de:'Hier steht mein Text.',en:'My description goes here.'},tag:'PROJECT'},
        {icon:'✧',number:'02',title:{de:'Feature Zwei',en:'Feature Two'},text:{de:'Weitere Details.',en:'More details.'},tag:'FEATURE'}
      ]},
    {id:'about',type:'text',enabled:true,label:{de:'02 / ÜBER DAS PROJEKT',en:'02 / ABOUT'},
      title:{de:'ÜBER<br><em>DAS PROJEKT.</em>',en:'ABOUT<br><em>THE PROJECT.</em>'},
      intro:{de:'Hier kannst du dein neues Projekt vorstellen.',en:'Introduce your project here.'}},
    {id:'faq',type:'faq',enabled:false,label:{de:'03 / FAQ',en:'03 / FAQ'},
      title:{de:'FRAGEN &<br><em>ANTWORTEN.</em>',en:'QUESTIONS &<br><em>ANSWERS.</em>'},
      items:[{question:{de:'Worum geht es?',en:'What is this?'},answer:{de:'Mein neues Projekt.',en:'My new project.'}}]}
    // Weitere Sections mit type: cards/story/timeline/faq/connect/text/gallery
  ]
};
