/**
 * THUNDR_STUDIOS — DEINE INHALTE
 * Alles hier kannst du später direkt auf GitHub bearbeiten.
 * Sprachversionen: Für Profilfelder bio_en / aboutText_en ändern.
 * Bei Projekten steht en: { subtitle, type, status, description } für die englische Fassung.
 * Fehlt eine EN-Übersetzung, wird der deutsche Text angezeigt.
 * Keine externen Projekt-URLs: Die Projekte öffnen ausschließlich lokale Unterseiten über `page`.
 * Die Minecraft-IP wird unabhängig davon in projects/quasarphysics/quasarphysics_data.js gepflegt.
 * Optional: image: "assets/projektbild.webp".
 * NEU V7: page: "projects/mein-projekt/" öffnet eine EIGENE HTML-Unterseite dieser GitHub-Pages-Website.
 * Für jedes Projekt lässt sich eine eigene Unterseite im Ordner projects/ anlegen.
 * Ein neues Projekt mit eigener Seite: projects/_vorlage/ als neuen Ordner kopieren, index.html/CSS/JS bearbeiten, dann hier das Objekt ergänzen.
 * Mögliche Kategorien: "games", "websites", "minecraft-mods", "minecraft-server".
 */
window.STUDIO_DATA = {
  studioName: "ThundR_Studios",
  ownerName: "Fynn",
  creatorName: "ThundR_G4ming",
  headline: "Ideen werden zu Welten.",
  bio: "Hey, ich bin Fynn – Developer, Gamer und der Kopf hinter ThundR_Studios. Ich baue Games, Websites, Minecraft-Mods und Server-Projekte. Von der ersten Idee über den Prototyp bis zum fertigen Erlebnis: Hier findest du alles an einem Ort.",
  aboutText_en: "Programming is both my job and my hobby. I love trying out new mechanics, creating interactive worlds, and bringing creative ideas to life through code.",
  bio_en: "Hey, I’m Fynn — developer, gamer, and the person behind ThundR_Studios. I build games, websites, Minecraft mods, and server projects. From the first idea to a prototype and the finished experience, you’ll find everything in one place.",
  aboutText: "Programmieren ist für mich nicht nur Arbeit, sondern auch Hobby. Ich liebe es, neue Mechaniken auszuprobieren, interaktive Welten zu erschaffen und kreative Ideen mit Code zum Leben zu bringen.",
  skills: ["Game Development", "Unity & C#", "Web Development", "JavaScript / TypeScript", "Minecraft Modding", "Java", "UI / UX", "Creative Coding"],
  socials: {
    // Die Profiladressen basieren auf deinem genannten Nutzernamen.
    // Bitte prüfen und bei Bedarf hier anpassen.
    twitch: "https://www.twitch.tv/ThundR_G4ming",
    tiktok: "https://www.tiktok.com/@ThundR_G4ming",
    youtube: "https://www.youtube.com/@ThundR_G4ming",
    // Trage deinen Einladungslink ein, z.B.: https://discord.gg/DEINCODE
    discord: "",
    // Optional: https://github.com/DEIN-NAME
    github: ""
  },
  // Freischaltung ab V5: JEDES Projekt hat seine eigene Einstellung.
  // locked: "yes" -> Code erforderlich | locked: "no" -> öffentlich.
  // code: "DEIN-CODE" -> direkt hier ändern (Groß-/Kleinschreibung egal).
  // ACHTUNG: GitHub Pages veröffentlicht data.js, somit sind Codes kein Geheimnis!
  projects: [
    {
      id: "aincrad-warriors",
      en: {"subtitle": "A New World", "type": "Action RPG · Unity", "status": "In development", "description": "A 3D action RPG featuring open exploration, first- and third-person cameras, sword skills, combat, and a custom progression system."},
      locked: "yes",           // "yes" = mit Code, "no" = ohne Code
      code: "AW-A65B-R3SP",  // frei änderbarer Code für dieses Projekt
      title: "Aincrad Warriors",
      subtitle: "A New World",
      category: "games",
      type: "Action RPG · Unity",
      status: "In Entwicklung",
      featured: true,
      theme: "violet",
      icon: "swords",
      description: "Ein 3D-Action-RPG mit freier Erkundung, First-/Third-Person-Kamera, Schwert-Skills, Kampf und eigener Progression.",
      tags: ["Unity", "C#", "RPG"],
    },
    {
      id: "forge-your-earth",
      en: {"subtitle": "Forge your own legend", "type": "Open World · Crafting", "status": "Concept", "description": "An open-world blacksmithing game with interactive crafting, resources, weapons, skills, and an expansive game world."},
      locked: "yes",           // "yes" = mit Code, "no" = ohne Code
      code: "FYE-E53N-HDKG",  // frei änderbarer Code für dieses Projekt
      title: "Forge Your Earth",
      subtitle: "Schmiede deine eigene Legende",
      category: "games",
      type: "Open World · Crafting",
      status: "Konzept",
      featured: true,
      theme: "ember",
      icon: "hammer",
      description: "Ein Open-World-Schmiedeprojekt mit interaktivem Crafting, Materialien, Waffen, Skills und einer großen Spielwelt.",
      tags: ["Unity", "Open World", "Crafting"],
    },
    {
      id: "ninkai",
      en: {"subtitle": "Shinobi Adventure", "type": "Anime Adventure · RPG", "status": "Concept", "description": "An ambitious shinobi game concept featuring custom character creation, a chakra system, and dynamic abilities."},
      locked: "yes",           // "yes" = mit Code, "no" = ohne Code
      code: "N-JQBR-GBU3",  // frei änderbarer Code für dieses Projekt
      title: "NinKai",
      subtitle: "Shinobi Adventure",
      category: "games",
      type: "Anime Adventure · RPG",
      status: "Konzept",
      featured: false,
      theme: "cyan",
      icon: "sparkles",
      description: "Ein ambitioniertes Shinobi-Spielkonzept mit eigener Charaktererstellung, Chakra-System und dynamischen Fähigkeiten.",
      tags: ["Game Design", "RPG", "3D"],
    },
    {
      id: "mymap",
      en: {"subtitle": "Local discovery platform", "type": "Web App · Platform", "status": "Project", "description": "A web platform for discovering local businesses, services, and interesting places."},
      locked: "yes",           // "yes" = mit Code, "no" = ohne Code
      code: "M-WBAY-24RJ",  // frei änderbarer Code für dieses Projekt
      title: "MyMap",
      subtitle: "Local discovery platform",
      category: "websites",
      type: "Web App · Plattform",
      status: "Projekt",
      featured: true,
      theme: "cyan",
      icon: "map",
      description: "Eine Webplattform, auf der man lokale Geschäfte, Dienstleistungen und interessante Orte entdecken kann.",
      tags: ["Web App", "JavaScript", "PHP"],
    },
    {
      id: "schoocial",
      en: {"subtitle": "Connect. Learn. Grow.", "type": "Social · Learning", "status": "Project", "description": "A social network for students featuring profiles, educational resources, subjects, and community features."},
      locked: "yes",           // "yes" = mit Code, "no" = ohne Code
      code: "S-TPM8-U9ES",  // frei änderbarer Code für dieses Projekt
      title: "Schoocial Media",
      subtitle: "Connect. Learn. Grow.",
      category: "websites",
      type: "Social · Learning",
      status: "Projekt",
      featured: false,
      theme: "violet",
      icon: "users",
      description: "Ein soziales Netzwerk für Schüler mit Profilen, Lerninhalten, Fächern und Community-Funktionen.",
      tags: ["Full Stack", "Social", "Education"],
    },
    {
      id: "jarvis",
      en: {"subtitle": "Personal AI dashboard", "type": "Web UI · Experiment", "status": "Project", "description": "A futuristic dashboard with voice interaction, animated visuals, and an interactive knowledge galaxy."},
      locked: "yes",           // "yes" = mit Code, "no" = ohne Code
      code: "J-YJ76-LC2J",  // frei änderbarer Code für dieses Projekt
      title: "JARVIS Interface",
      subtitle: "Personal AI dashboard",
      category: "websites",
      type: "Web UI · Experiment",
      status: "Projekt",
      featured: false,
      theme: "gold",
      icon: "cpu",
      description: "Ein futuristisches Dashboard mit Sprachoberfläche, animierter Visualisierung und einer interaktiven Knowledge-Galaxy.",
      tags: ["UI / UX", "JavaScript", "AI"],
    },
    {
      id: "create-minephone",
      en: {"subtitle": "Communication reimagined", "type": "Minecraft · Create Add-on", "status": "Concept", "description": "A Minecraft Create add-on featuring smartphones, charging, communication, apps, and a dedicated mobile network."},
      locked: "yes",           // "yes" = mit Code, "no" = ohne Code
      code: "CM-YB8E-CV64",  // frei änderbarer Code für dieses Projekt
      title: "Create: MinePhone",
      subtitle: "Communication reimagined",
      category: "minecraft-mods",
      type: "Minecraft · Create Add-on",
      status: "Konzept",
      featured: true,
      theme: "gold",
      icon: "smartphone",
      description: "Ein Minecraft-Create-Addon rund um Smartphones, Laden, Kommunikation, Apps und ein eigenes Mobilfunknetz.",
      tags: ["Minecraft", "Create", "Java"],
    },
    {
      id: "create-industries",
      en: {"subtitle": "More possibilities", "type": "Minecraft · Modding", "status": "Project", "description": "An expansion of the Create ecosystem with new materials, ores, and technical possibilities."},
      locked: "yes",           // "yes" = mit Code, "no" = ohne Code
      code: "CI-2K6Z-GK8R",  // frei änderbarer Code für dieses Projekt
      title: "Create Industries",
      subtitle: "More possibilities",
      category: "minecraft-mods",
      type: "Minecraft · Modding",
      status: "Projekt",
      featured: false,
      theme: "ember",
      icon: "boxes",
      description: "Eine Erweiterung der Create-Spielwelt mit neuen Materialien, Erzen und technischen Möglichkeiten.",
      tags: ["Minecraft", "Forge", "Create"],
    },
    {
      id: "create-beyond-stars",
      en: {"subtitle": "Engineering beyond limits", "type": "Minecraft · Modpack", "status": "Project", "description": "A Minecraft modpack focused on technology, Create, and journeys far beyond the ordinary game world."},
      locked: "yes",           // "yes" = mit Code, "no" = ohne Code
      code: "CBS-9RSY-LDR7",  // frei änderbarer Code für dieses Projekt
      title: "Create Beyond the Stars",
      subtitle: "Engineering beyond limits",
      category: "minecraft-mods",
      type: "Minecraft · Modpack",
      status: "Projekt",
      featured: false,
      theme: "violet",
      icon: "orbit",
      description: "Ein Minecraft-Modpack mit Fokus auf Technik, Create und einer Reise weit über die gewöhnliche Spielwelt hinaus.",
      tags: ["Minecraft", "Modpack", "Automation"],
    },
    {
      id: "quasar-physics",
      en: {"subtitle": "Create & Physics Modded Server", "type": "Minecraft · Community Server", "status": "Beta testing", "description": "A new Create / Create Aeronautics server for everyone."},
      locked: "yes",           // "yes" = mit Code, "no" = ohne Code
      code: "QP-WGVP-EZJW",  // frei änderbarer Code für dieses Projekt
      title: "Create: QuasarPhysics",
      subtitle: "Create & Physics Modded Server",
      category: "minecraft-server",
      type: "Minecraft · Community Server",
      status: "Beta Tests",
      featured: false,
      theme: "gold",
      icon: "server",            // Fallback-Icon, falls kein Bild vorhanden ist
      image: "assets/quasar-physics.webp",  // Dein QuasarPhysics-Logo
      page: "projects/quasarphysics/", // Eigene Webseite mit eigener index.html + CSS + JavaScript
      description: "Ein neuer Create/Create Aeronautics Server für alle",
      tags: ["Minecraft", "Server", "Create Mod", "Sable"],
    },
    {
      id: "thundr-modded-smp",
      en: {"subtitle": "Community Minecraft Server", "type": "Minecraft · Community Server", "status": "Planned", "description": "A planned Minecraft server for playing together. The mod list, version, address, and launch date will be added later."},
      locked: "yes",           // "yes" = mit Code, "no" = ohne Code
      code: "TMS-96LY-UXUB",  // frei änderbarer Code für dieses Projekt
      title: "ThundR Modded SMP",
      subtitle: "Community Minecraft Server",
      category: "minecraft-server",
      type: "Minecraft · Community Server",
      status: "Geplant",
      featured: false,
      theme: "gold",
      icon: "server",
      description: "Geplanter Minecraft-Server für gemeinsames Spielen. Modliste, Version, Adresse und Starttermin werden hier später ergänzt.",
      tags: ["Minecraft", "Server", "Community"],
    },
    {
      id: "create-space-server",
      en: {"subtitle": "Technology, Economy & Space", "type": "Minecraft · Modded Server", "status": "Concept", "description": "A server concept for a tech-focused modpack featuring Create, an economy, and space exploration. Not publicly available yet."},
      locked: "yes",           // "yes" = mit Code, "no" = ohne Code
      code: "CSS-HMMT-3MYH",  // frei änderbarer Code für dieses Projekt
      title: "Create Space Server",
      subtitle: "Technik, Wirtschaft & Space",
      category: "minecraft-server",
      type: "Minecraft · Modded Server",
      status: "Konzept",
      featured: false,
      theme: "cyan",
      icon: "server",
      description: "Server-Konzept für ein technikorientiertes Modpack mit Create, Wirtschaft und Weltraum-Features. Noch nicht öffentlich verfügbar.",
      tags: ["Create", "Multiplayer", "Modpack"],
    }
  ]
};
