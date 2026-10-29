/**
 * CREATE: QUASARPHYSICS / CONTENT STUDIO
 * --------------------------------------
 * Diese Datei ist dein SECTION-BUILDER. Kein HTML für neue Abschnitte nötig.
 *
 * SECTION-TYPEN:
 *  cards    = Kachel-Raster mit Icons und Texten
 *  story    = großer Textbereich mit dekorativer Technik-Konsole
 *  timeline = Entwicklungsphasen / Roadmap
 *  faq      = aufklappbare Fragen und Antworten
 *  connect  = Minecraft-IP mit Kopieren-Button
 *  text     = normaler Textbereich
 *  gallery  = Bilder aus deinem Projektordner
 *
 * Jeder Abschnitt braucht: id, type, enabled und title (de/en).
 * Die Reihenfolge innerhalb von sections bestimmt die Reihenfolge auf der Website.
 * enabled: false blendet einen Abschnitt aus.
 * Wichtig: Alle Texte als {de: '...', en: '...'} schreiben.
 */
window.QUASAR_DATA = {
  serverAddress: 'quasar-physics.kinetichosting.io', // REINER TEXT, KEIN WEBLINK
  minecraftVersion: '',  // Versionsangabe erst bei bestätigter Version eintragen
  status: {de: 'BETA TESTS', en: 'BETA TESTS'}, // manuell gepflegt, keine Live-Abfrage
  highlights: [
    {value:'CREATE', label:{de:'TECHNOLOGIE',en:'TECHNOLOGY'}},
    {value:'PHYSICS', label:{de:'EXPERIMENTE',en:'EXPERIMENTS'}},
    {value:'JAVA', label:{de:'EDITION',en:'EDITION'}},
    {value:'BETA', label:{de:'PROJEKTSTATUS',en:'PROJECT STATUS'}}
  ],
  sections: [
    {
      id:'features', type:'cards', enabled:true,
      label:{de:'01 / DEIN SPIELRAUM',en:'01 / YOUR PLAYGROUND'},
      title:{de:'ERSCHAFFE DAS<br><em>UNMÖGLICHE.</em>',en:'CREATE THE<br><em>IMPOSSIBLE.</em>'},
      intro:{de:'Technik, Kreativität und Experimentierfreude – entdecke die Schwerpunkte unseres Serverprojekts.',en:'Technology, creativity and experimentation – explore what our server project is about.'},
      items:[
        {icon:'⚙',number:'01',title:{de:'CREATE ENGINEERING',en:'CREATE ENGINEERING'},text:{de:'Plane Fabriken, Automatisierung und kreative Maschinen im Create-Ökosystem.',en:'Build factories, automation systems and creative machines using the Create ecosystem.'},tag:'CREATE'},
        {icon:'⬡',number:'02',title:{de:'PHYSICS & AERONAUTICS',en:'PHYSICS & AERONAUTICS'},text:{de:'Experimentiere mit Konstruktionen und Ideen rund um Physik und bewegliche Technik.',en:'Experiment with structures and ideas around physics and movable machinery.'},tag:'PHYSICS'},
        {icon:'✧',number:'03',title:{de:'COMMUNITY UNIVERSE',en:'COMMUNITY UNIVERSE'},text:{de:'Gemeinsam tüfteln, die Welt erkunden und großartige Bauprojekte starten.',en:'Collaborate, explore the world and build ambitious community projects.'},tag:'MULTIPLAYER'}
      ]
    },
    {
      id:'vision',type:'story',enabled:true,
      label:{de:'02 / DIE VISION',en:'02 / OUR VISION'},
      title:{de:'EINE WELT.<br><em>UNENDLICHE IDEEN.</em>',en:'ONE WORLD.<br><em>ENDLESS IDEAS.</em>'},
      intro:{de:'QuasarPhysics ist mehr als eine klassische Multiplayer-Welt. Es ist ein Raum für Maschinen, Experimente und gemeinsame Ideen – inspiriert vom Create-Universum.',en:'QuasarPhysics is more than a classic multiplayer world. It is a place for machines, experiments and collaboration — inspired by the Create universe.'},
      quote:{de:'Kleine Zahnräder. Große Visionen.',en:'Small gears. Big visions.'},
      chips:['CREATE','SABLE','AERONAUTICS','COMMUNITY']
    },
    {
      id:'roadmap',type:'timeline',enabled:true,
      label:{de:'03 / MISSION CONTROL',en:'03 / MISSION CONTROL'},
      title:{de:'DIE NÄCHSTEN<br><em>MISSIONEN.</em>',en:'THE NEXT<br><em>MISSIONS.</em>'},
      intro:{de:'Unsere Entwicklungs-Roadmap – geplante Schritte, keine verbindlichen Veröffentlichungstermine.',en:'Our development roadmap — planned steps, not confirmed release dates.'},
      items:[
        {phase:'01',state:'current',title:{de:'SERVER-BASIS',en:'SERVER FOUNDATION'},text:{de:'Grundkonfiguration, Mod-Kompatibilität und erste interne Tests.',en:'Initial setup, mod compatibility and early internal testing.'}},
        {phase:'02',state:'planned',title:{de:'PHYSIK & GAMEPLAY',en:'PHYSICS & GAMEPLAY'},text:{de:'Create-Mechaniken, Konstruktionen und Stabilität weiter testen.',en:'Further testing of Create mechanics, contraptions and stability.'}},
        {phase:'03',state:'planned',title:{de:'COMMUNITY-START',en:'COMMUNITY LAUNCH'},text:{de:'Community-Feedback sammeln und weitere Inhalte planen.',en:'Collect community feedback and plan further content.'}}
      ]
    },
    {
      id:'connect',type:'connect',enabled:true,
      label:{de:'04 / MISSION ENTRY',en:'04 / MISSION ENTRY'},
      title:{de:'BEREIT FÜR<br><em>DEN START?</em>',en:'READY FOR<br><em>LAUNCH?</em>'},
      intro:{de:'Kopiere die Minecraft-Serveradresse und füge sie im Mehrspieler-Menü ein. Prüfe vor dem Beitritt, welche Modpack-Version benötigt wird.',en:'Copy the Minecraft server address and enter it in the multiplayer menu. Check the required modpack version before joining.'}
    },
    {
      id:'faq',type:'faq',enabled:true,
      label:{de:'05 / FREQUENCIES',en:'05 / FREQUENCIES'},
      title:{de:'HÄUFIGE<br><em>FRAGEN.</em>',en:'FREQUENT<br><em>QUESTIONS.</em>'},
      items:[
        {question:{de:'Ist QuasarPhysics schon öffentlich verfügbar?',en:'Is QuasarPhysics open to everyone yet?'},answer:{de:'Das Projekt befindet sich in der Beta-Testphase. Der Status hier wird manuell gepflegt und bestätigt keine aktuelle Erreichbarkeit.',en:'The project is in beta testing. This status is updated manually and does not confirm current availability.'}},
        {question:{de:'Welches Minecraft wird benötigt?',en:'Which Minecraft version is required?'},answer:{de:'Die benötigte Minecraft- und Modpack-Version wird bekanntgegeben, sobald sie feststeht.',en:'The required Minecraft and modpack version will be announced once confirmed.'}},
        {question:{de:'Brauche ich Mods zum Spielen?',en:'Do I need mods to play?'},answer:{de:'Der Server ist als modifiziertes Create-/Physics-Projekt geplant. Die genaue Liste folgt.',en:'The server is planned as a modded Create/Physics project. The exact list will follow.'}}
      ]
    }
    // NÄCHSTE SECTION HIER EINFÜGEN, mit einem Komma nach dem vorigen Objekt:
    // {id:'news',type:'text',enabled:true,label:{de:'NEWS',en:'NEWS'},
    //  title:{de:'MEINE NEWS',en:'MY NEWS'},
    //  intro:{de:'Dein Text',en:'Your text'}},
    // GALERIE: {id:'gallery',type:'gallery',enabled:true,title:{de:'GALERIE',en:'GALLERY'},
    //  items:[{image:'images/screenshot1.webp',caption:{de:'Basis',en:'Base'}}]}
  ]
};
