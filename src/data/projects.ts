/**
 * Portfolio project data for individual project pages
 * Each project has detailed content for SEO and case study purposes
 *
 * SEO Strategy: Each case study targets industry-specific keywords like
 * "website schildersbedrijf", "sportschool website laten maken", etc.
 */

export interface Project {
	slug: string;
	title: string;
	category: "Concept" | "Live";
	industry: string;
	location: string;
	image: string;
	mobileImage?: string;
	/** Pre-made desktop mockup image (with device frame baked in) */
	desktopMockup?: string;
	/** Pre-made mobile mockup image (with device frame baked in) */
	mobileMockup?: string;
	/** Multi-device showcase mockup for homepage */
	showcaseMockup?: string;
	link: string;
	shortDescription: string;
	fullDescription: string;
	challenge: string;
	solution: string;
	features: string[];
	results?: string[];
	testimonial?: {
		quote: string;
		author: string;
		role: string;
	};
	/** Whether to show this project in the homepage showcase */
	featured?: boolean;
	/** Primary showcase project for homepage hero */
	showcasePrimary?: boolean;
	/** Target audience description for SEO */
	targetAudience?: string;
	/** Industry-specific keywords for SEO */
	industryKeywords?: string[];
	/** Technical highlights (speed, SEO scores, etc.) */
	technicalHighlights?: string[];
	/** Why businesses in this industry need a professional website */
	industryContext?: string;
}

export const projects: Project[] = [
	{
		slug: "schildersbedrijf-visser",
		title: "Schildersbedrijf Visser",
		category: "Concept",
		industry: "Schildersbedrijf",
		location: "Geldermalsen",
		image: "/assets/projects/visserschilders-pc.webp",
		mobileImage: "/assets/projects/visserschilders-mobile.webp",
		showcaseMockup: "/assets/projects/showcase-mockup.webp",
		link: "https://visserschilders.knapgemaakt.nl/",
		shortDescription: "Professionele uitstraling voor een ervaren vakschilder.",
		fullDescription: `Schildersbedrijf Visser is al ruim 20 jaar actief als vakschilder in Geldermalsen en omgeving. Ze zijn gespecialiseerd in binnen- en buitenschilderwerk, spuitwerk, sierpleisters zoals marmerpleister en Coristil, behangen en meubel restyling. Voor dit concept hebben we een website ontworpen die de jarenlange ervaring en het vakmanschap van het bedrijf uitstraalt.

Een website voor een schildersbedrijf moet vertrouwen wekken. Potentiële klanten zoeken online naar "schilder Geldermalsen" of "schildersbedrijf Betuwe" en beslissen binnen seconden of ze contact opnemen. Met een professionele website onderscheidt Visser zich direct van concurrenten die alleen een Facebook-pagina hebben.`,
		challenge: `Het schildersvak wordt vaak geassocieerd met standaard huisschilderwerk. Schildersbedrijf Visser onderscheidt zich echter met specialistische diensten zoals marmerpleister en meubel restyling. De uitdaging was om een website te maken die deze brede expertise duidelijk communiceert naar potentiële klanten in de regio Geldermalsen.

Veel schildersbedrijven vertrouwen nog op mond-tot-mondreclame en een vermelding in de Gouden Gids. Maar steeds meer huiseigenaren en bedrijven oriënteren zich online. Ze googelen "buitenschilderwerk offerte" of "schilder in de buurt" en verwachten een professionele website met portfolio en contactmogelijkheden.`,
		solution: `We hebben gekozen voor een strak, modern design met veel wit en subtiele accenten. Grote, kwalitatieve foto's van het werk staan centraal. De typografie is verfijnd en professioneel. Elke pagina ademt vakmanschap en betrouwbaarheid.

De website is gebouwd met moderne technologie die razendsnel laadt — cruciaal voor bezoekers die vanaf hun telefoon zoeken naar een schilder. Alle diensten hebben een eigen pagina met gerichte content, waardoor de site beter vindbaar is voor specifieke zoekopdrachten zoals "marmerpleister Geldermalsen" of "houtrot reparatie Betuwe".`,
		features: [
			"Responsive design voor alle apparaten",
			"Portfolio met projectfoto's per dienst",
			"Aparte landingspagina's per specialisme",
			"SEO-geoptimaliseerd voor lokale vindbaarheid",
			"Laadtijd onder 1 seconde",
			"Click-to-call voor mobiele bezoekers",
		],
		featured: true,
		showcasePrimary: true,
		targetAudience: "Huiseigenaren en bedrijven in Geldermalsen, Tiel, Culemborg en de Betuwe die zoeken naar een betrouwbare schilder voor binnen- of buitenschilderwerk, sierpleisters of renovatieprojecten.",
		industryKeywords: [
			"website schildersbedrijf",
			"schildersbedrijf website laten maken",
			"webdesign schilder",
			"schilder website voorbeeld",
			"schildersbedrijf online vindbaarheid",
		],
		technicalHighlights: [
			"Laadtijd < 1 seconde op mobiel",
			"Lighthouse Performance score 95+",
			"Geoptimaliseerd voor 'schilder + [stad]' zoekopdrachten",
			"Geen WordPress — geen onderhoud of beveiligingsrisico's",
		],
		industryContext: "De schildersbranche is traditioneel, maar klanten zoeken steeds vaker online. Een schildersbedrijf zonder professionele website mist potentiële opdrachten aan concurrenten die wél vindbaar zijn. Lokale SEO is essentieel: 76% van de mensen die lokaal zoeken, neemt binnen 24 uur contact op.",
	},
	{
		slug: "fitcity-culemborg",
		title: "Fitcity Culemborg",
		category: "Concept",
		industry: "Sportschool",
		location: "Culemborg",
		image: "/assets/projects/fitcityculemborg.webp",
		mobileImage: "/assets/projects/fitcity-mobile.webp",
		desktopMockup: "/assets/projects/fitcity-browser-window-mockup.webp",
		mobileMockup: "/assets/projects/fitcity-mobile-mockup.webp",
		link: "https://fitcityculemborg.knapgemaakt.nl",
		shortDescription: "Betaalbaar sporten in een toegankelijke omgeving.",
		fullDescription: `Fitcity Culemborg is een gezondheidscentrum voor sport, bewegen en zorg. Ze positioneren zich als de meest betaalbare sportschool van de regio en zijn ook actief in het sociale domein. Dit concept toont hoe een toegankelijke sportschool zich online professioneel kan presenteren.

Voor sportscholen is online vindbaarheid cruciaal. Mensen zoeken "sportschool Culemborg", "fitness bij mij in de buurt" of "goedkoop sporten Rivierenland". Zonder een sterke website verlies je potentiële leden aan concurrenten die wél bovenaan Google staan. Een sportschool website moet direct antwoord geven op de belangrijkste vragen: wat kost het, wanneer ben je open, en hoe meld ik me aan?`,
		challenge: `Fitcity Culemborg richt zich op betaalbaarheid en toegankelijkheid, niet op luxe faciliteiten. De uitdaging was om een website te maken die deze no-nonsense aanpak communiceert terwijl het toch professioneel en uitnodigend oogt voor nieuwe leden.

In de fitnessbranche domineren grote ketens met dure marketingbudgetten de zoekresultaten. Een lokale sportschool moet slim omgaan met SEO: focussen op lokale zoekopdrachten en zich onderscheiden op persoonlijke service en community. De website moet bezoekers binnen seconden overtuigen dat dit dé plek is om te sporten.`,
		solution: `We creëerden een frisse, energieke website die de community en toegankelijkheid benadrukt. De nadruk ligt op de betaalbare prijzen, ruime openingstijden (7 dagen per week) en de laagdrempelige sfeer. Call-to-actions zijn helder en direct.

De website is geoptimaliseerd voor conversie: de "Word Lid" knop is altijd zichtbaar, prijzen staan transparant op de homepage, en het aanmeldformulier is kort en simpel. Geen eindeloos scrollen — bezoekers krijgen direct de informatie die ze zoeken.`,
		features: [
			"Ledenwerving optimalisatie met duidelijke CTA's",
			"Openingstijden en prijzen direct zichtbaar",
			"Online aanmeldformulier",
			"Mobile-first ontwerp voor onderweg",
			"Lokale SEO voor 'sportschool Culemborg'",
			"Snelle laadtijd voor betere Google ranking",
		],
		featured: true,
		targetAudience: "Inwoners van Culemborg en omgeving die zoeken naar een betaalbare, toegankelijke sportschool. Van jongeren die beginnen met fitness tot senioren die fit willen blijven.",
		industryKeywords: [
			"website sportschool",
			"sportschool website laten maken",
			"fitness website",
			"gym website voorbeeld",
			"sportschool ledenwerving online",
		],
		technicalHighlights: [
			"Mobile-first design (70% van bezoekers komt via telefoon)",
			"Prominente click-to-call voor directe vragen",
			"Geoptimaliseerd voor 'sportschool + [stad]' zoekopdrachten",
			"Snelle laadtijd voor betere Google ranking",
		],
		industryContext: "De fitnessbranche is competitief. Potentiële leden vergelijken sportscholen online voordat ze langskomen. Een professionele website met transparante prijzen en een simpel aanmeldproces verlaagt de drempel om lid te worden. Lokale SEO is essentieel: zoekopdrachten als 'sportschool bij mij in de buurt' leveren de meest waardevolle bezoekers op.",
	},
	{
		slug: "byshakir",
		title: "By Shakir",
		category: "Concept",
		industry: "Luxe Interieur",
		location: "Tiel",
		image: "/assets/projects/byshakir.webp",
		mobileImage: "/assets/projects/byshakir-mobile.webp",
		link: "https://byshakir.knapgemaakt.nl",
		shortDescription: "Metropolitan Luxury voor exclusieve interieurs.",
		fullDescription: `By Shakir | Metropolitan Luxury is een luxe interieurzaak in Tiel, geleid door de Nederlandse ontwerper Shakir. Al meer dan 15 jaar creëren zij op maat gemaakte, high-end meubels en complete interieuroplossingen voor veeleisende klanten in binnen- en buitenland.

Een website voor een luxe interieurzaak is meer dan een digitale brochure — het is een verlengstuk van de showroom. Bezoekers moeten direct de kwaliteit en exclusiviteit voelen. Van de eerste scroll tot het contactformulier moet alles premium aanvoelen. Potentiële klanten zoeken naar "luxe meubels op maat" of "interieurontwerper Nederland" en verwachten een online ervaring die past bij het prijssegment.`,
		challenge: `De luxe interieurmarkt vraagt om een online presentatie die de exclusiviteit en het vakmanschap weerspiegelt. By Shakir wilde een website die dezelfde "Metropolitan Luxury" uitstraalt als hun showroom aan de Gijbert Stoutweg in Tiel.

In het premium segment bepaalt de website vaak de eerste indruk. Klanten die €10.000+ uitgeven aan een maatwerk bank verwachten geen standaard template-site. De uitdaging was om een digitale ervaring te creëren die de showroom eer aandoet en tegelijkertijd functioneel is: bezoekers moeten eenvoudig de collectie kunnen bekijken en contact kunnen opnemen voor advies.`,
		solution: `We ontwierpen een website met een donker, luxueus kleurenpalet en elegante typografie die past bij het premium segment. Grote beelden van exclusieve meubels en interieurs staan centraal. De sfeer ademt exclusiviteit en ambachtelijk vakmanschap.

Elke pagina is een showcase. Producten worden gepresenteerd met ruimte om te ademen — geen drukke layouts, geen afleidende elementen. De navigatie is intuïtief, de call-to-actions subtiel maar duidelijk. Het resultaat is een website die net zo premium aanvoelt als de meubels die erin worden getoond.`,
		features: [
			"Luxe productpresentatie met grote beelden",
			"Collectie showcase per categorie",
			"Showroom locatie en openingstijden",
			"Contact voor persoonlijk advies op maat",
			"Internationale uitstraling met meertalige opties",
			"Snelle laadtijd ondanks grote afbeeldingen",
		],
		featured: true,
		targetAudience: "Vermogende particulieren en bedrijven in Nederland en België die zoeken naar exclusieve, op maat gemaakte meubels en complete interieuroplossingen. Architecten en binnenhuisarchitecten die samenwerken met premium leveranciers.",
		industryKeywords: [
			"website interieurzaak",
			"luxe meubels website",
			"interieurdesign webdesign",
			"showroom website laten maken",
			"premium interieur website voorbeeld",
		],
		technicalHighlights: [
			"Geoptimaliseerde afbeeldingen voor snelle laadtijd",
			"Donker kleurenschema voor luxe uitstraling",
			"Responsive gallery voor collectie presentatie",
			"SEO voor 'luxe interieur + [regio]' zoekopdrachten",
		],
		industryContext: "In de luxe interieurbranche is de website vaak het eerste contactmoment. Klanten verwachten een online ervaring die past bij het prijssegment. Een goedkope of trage website wekt twijfel over de kwaliteit van de producten. Investeren in een premium website is geen luxe, maar noodzaak voor bedrijven die zich richten op het hogere segment.",
	},
];

export function getProjectBySlug(slug: string): Project | undefined {
	return projects.find((p) => p.slug === slug);
}

export function getAllProjects(): Project[] {
	return projects;
}

export function getFeaturedProjects(): Project[] {
	return projects.filter((p) => p.featured);
}

export function getShowcaseProject(): Project | undefined {
	return projects.find((p) => p.showcasePrimary) || projects[0];
}
