/**
 * City data for local SEO pages
 * Each city has unique content to maximize SEO value (60-70% unique per page)
 */

export interface FAQItem {
	question: string;
	answer: string;
}

export interface CityStats {
	/** Number of registered businesses/entrepreneurs */
	businesses?: string;
	/** Key industry or economic sector */
	mainIndustry?: string;
	/** Interesting local economic fact */
	economicFact?: string;
	/** Year the city was founded or received city rights */
	founded?: string;
}

export interface CityData {
	name: string;
	slug: string;
	region: string;
	description: string; // 2-3 sentences about the city for intro
	businessContext: string; // Why businesses in this city need a website
	localFocus: string; // What makes this city unique for local businesses
	nearbyAreas: string[]; // Surrounding areas we also serve
	landmarks?: string; // Optional: notable landmarks or areas
	population?: string; // Optional: city size context
	/** Unique statistics and facts about the city's economy */
	stats?: CityStats;
	/** Specific industries or business types common in this city */
	targetIndustries?: string[];
	/** FAQ items for this city's location page (SEO) */
	faqs: FAQItem[];
	/** Related case study slug if available */
	relatedProject?: string;
}

export const cities: Record<string, CityData> = {
    culemborg: {
		name: "Culemborg",
		slug: "culemborg",
		region: "Rivierenland",
		population: "30.000 inwoners",
		description:
			"Culemborg is een historische vestingstad aan de Lek met een bruisend centrum vol lokale ondernemers. Van de gezellige Markt tot de karakteristieke binnenstad: hier draait alles om persoonlijk contact en lokale verbinding.",
		businessContext:
			"Als ondernemer in Culemborg concurreer je met grotere steden als Utrecht en Tiel. Een professionele website zorgt ervoor dat klanten jou vinden wanneer ze zoeken naar diensten in de regio. Steeds meer Culemborgers oriënteren zich online voordat ze lokaal kopen.",
		localFocus:
			"Wij kennen Culemborg als geen ander. Het is onze thuisbasis. We begrijpen de lokale markt, weten wat werkt voor ondernemers aan de Markt of in het Blauwe Huis-gebied, en spreken de taal van de Culemborgse ondernemer.",
		nearbyAreas: ["Beusichem", "Everdingen", "Schalkwijk", "Leerdam"],
		landmarks: "Binnenpoort, Markt, Barbarakerk",
		stats: {
			businesses: "2.800+ ondernemers",
			mainIndustry: "Detailhandel & Horeca",
			economicFact: "De binnenstad telt meer dan 150 winkels en horecazaken op loopafstand",
			founded: "Stadsrechten sinds 1318"
		},
		targetIndustries: ["Horeca", "Retail", "Persoonlijke dienstverlening", "Gezondheid & Fitness"],
		relatedProject: "fitcity-culemborg",
		faqs: [
			{
				question: "Waarom zou ik als Culemborgse ondernemer niet gewoon naar Utrecht gaan voor mijn website?",
				answer: "Utrechtse bureaus vragen al snel €2.000 tot €5.000. Wij leveren dezelfde kwaliteit voor €595. Plus: wij kennen Culemborg. We weten dat de Markt andere klanten trekt dan bedrijventerrein Pavijen. Die kennis zit in je website."
			},
			{
				question: "Hebben jullie ervaring met horecazaken in Culemborg?",
				answer: "Ja. De binnenstad heeft meer dan 150 winkels en horecazaken. We hebben websites gebouwd voor restaurants, cafés en retailers in vergelijkbare settings. We weten hoe je gasten trekt die online zoeken naar 'uit eten Culemborg'."
			},
			{
				question: "Ik zit op bedrijventerrein Pavijen. Is een website dan nog relevant?",
				answer: "Zeker. B2B-klanten zoeken ook online. Een professionele website met goede vindbaarheid zorgt dat bedrijven uit de regio jou vinden. We optimaliseren voor zoektermen die jouw doelgroep gebruikt."
			},
			{
				question: "Jullie hebben FitCity Culemborg gemaakt. Werken jullie veel met sportscholen?",
				answer: "We hebben inderdaad de website van FitCity gebouwd. Voor sportscholen is online zichtbaarheid cruciaal: mensen zoeken 'sportschool Culemborg' en beslissen binnen seconden. Die ervaring zetten we graag in voor vergelijkbare bedrijven."
			},
			{
				question: "Ik concurreer met grotere ketens. Kan ik dat aan met een website van €595?",
				answer: "Absoluut. Culemborgers kiezen graag lokaal, maar ze verwachten wel een professionele uitstraling. Onze websites laden sneller en scoren beter in Google dan veel dure WordPress-sites van grote ketens."
			}
		],
	},
    utrecht: {
		name: "Utrecht",
		slug: "utrecht",
		region: "Utrecht",
		population: "360.000 inwoners",
		description:
			"Utrecht is het kloppend hart van Nederland. Een stad waar historie en innovatie samenkomen. Met de Domtoren als icoon en een bruisende startup-scene is Utrecht dé plek voor ambitieuze ondernemers.",
		businessContext:
			"In Utrecht is de concurrentie groot. Duizenden bedrijven strijden om de aandacht van dezelfde doelgroep. Een website die écht opvalt en goed vindbaar is, maakt het verschil tussen gevonden worden of onzichtbaar blijven.",
		localFocus:
			"Utrecht kent vele gezichten: van de horeca langs de Oudegracht tot de creatieve bureaus op de Wharf, van ZZP'ers in Lombok tot retailers in Hoog Catharijne. Wij bouwen websites die passen bij jouw specifieke Utrechtse doelgroep.",
		nearbyAreas: ["De Bilt", "Zeist", "Bunnik", "Maarssen"],
		landmarks: "Domtoren, Oudegracht, Neude",
		stats: {
			businesses: "45.000+ ondernemers",
			mainIndustry: "Creatieve sector & Tech",
			economicFact: "Utrecht is de snelst groeiende startup-hub van Nederland na Amsterdam",
			founded: "Stadsrechten sinds 1122"
		},
		targetIndustries: ["Startups", "Creatieve bureaus", "Horeca", "Consultancy", "Tech & SaaS"],
		faqs: [
			{
				question: "Waarom zou ik niet gewoon een Utrechts bureau inhuren?",
				answer: "Utrechtse bureaus rekenen €3.000 tot €8.000 voor een website. Ze hebben mooie kantoren aan de Oudegracht en veel overhead. Wij leveren hetzelfde resultaat voor €595. Zonder de vergaderingen, zonder de wachttijden."
			},
			{
				question: "Ik ben een startup met beperkt budget. Is €595 realistisch?",
				answer: "Juist voor startups is dit ideaal. Je hebt snel een professionele uitstraling zonder je runway op te branden aan een dure website. Later uitbreiden kan altijd. Veel Utrechtse startups beginnen zo."
			},
			{
				question: "Mijn doelgroep zit vooral in de creatieve sector. Snappen jullie dat?",
				answer: "We bouwen websites voor creatieve bureaus, freelancers en consultants. We weten dat je doelgroep kritisch kijkt naar design en dat je website je portfolio moet ondersteunen, niet overschaduwen."
			},
			{
				question: "Hoe val ik op tussen 45.000 andere Utrechtse ondernemers?",
				answer: "Door beter vindbaar te zijn. We optimaliseren voor zoektermen die jouw klanten gebruiken. 'Grafisch ontwerper Utrecht Lombok' is specifieker dan 'designer Utrecht'. Dat soort nuances maken het verschil."
			},
			{
				question: "Ik zit op het Utrecht Science Park. Werken jullie daar ook?",
				answer: "Ja. Van tech-startups tot consultancies op het Science Park: we kennen de dynamiek van snelgroeiende bedrijven. Een website die meegroeit is belangrijker dan een website die nu al alles kan."
			}
		],
	},
    houten: {
		name: "Houten",
		slug: "houten",
		region: "Regio Utrecht",
		population: "50.000 inwoners",
		description:
			"Houten staat bekend als één van de snelst gegroeide gemeenten van Nederland. Een moderne woonplaats met een dorps karakter. De sterke lokale gemeenschap zorgt voor een hecht netwerk van ondernemers.",
		businessContext:
			"Houtenaren zijn loyaal aan lokale ondernemers, maar verwachten wel een professionele uitstraling. Een goede website is je visitekaartje in een gemeente waar mond-tot-mondreclame digitaal wordt versterkt via lokale Facebook-groepen en Nextdoor.",
		localFocus:
			"Van het winkelcentrum Het Rond tot de bedrijventerreinen Doornkade en Loerik: Houten heeft een eigen dynamiek. Wij begrijpen dat Houtenaren waarde hechten aan kwaliteit en betrouwbaarheid boven de laagste prijs.",
		nearbyAreas: ["Bunnik", "'t Goy", "Schalkwijk", "Nieuwegein"],
		landmarks: "Het Rond, Castellum Hoge Woerd, Rondweg",
		stats: {
			businesses: "4.500+ ondernemers",
			mainIndustry: "Zakelijke dienstverlening",
			economicFact: "Houten groeide van 4.000 naar 50.000 inwoners in 40 jaar – uniek in Nederland",
			founded: "Nieuwe stad sinds 1966"
		},
		targetIndustries: ["ZZP & Freelancers", "Coaches & Trainers", "Kinderopvang", "Bouw & Verbouw"],
		faqs: [
			{
				question: "Houten heeft veel ZZP'ers. Passen jullie websites bij die doelgroep?",
				answer: "Precies onze focus. Coaches, trainers, consultants: we bouwen regelmatig websites voor zelfstandigen die een professionele uitstraling willen zonder groot budget. €595 past bij de ZZP-realiteit."
			},
			{
				question: "Houtenaren delen veel via Facebook en Nextdoor. Helpt een website dan nog?",
				answer: "Juist dan. Als iemand je aanbeveelt in een Houtense Facebook-groep, zoeken geïnteresseerden je online op. Een professionele website maakt van die aanbeveling een klant. Zonder website verlies je die kans."
			},
			{
				question: "Ik zit bij Het Rond. Hoe bereik ik klanten die online zoeken?",
				answer: "We optimaliseren je website voor lokale zoekopdrachten. Iemand die zoekt naar 'kapper Houten' of 'fysiotherapeut Het Rond' vindt jou. Dat is de kracht van lokale SEO."
			},
			{
				question: "Werken jullie ook voor kinderdagverblijven en BSO's?",
				answer: "Ja. Houten is een jonge gemeente met veel gezinnen. Kinderopvang is competitief hier. Een website die vertrouwen wekt en praktische info biedt (locatie, openingstijden, inschrijving) maakt het verschil voor ouders."
			},
			{
				question: "Mijn klanten zitten vooral in Houten zelf. Is landelijke vindbaarheid dan relevant?",
				answer: "We focussen op wat voor jou werkt. Voor lokale dienstverleners optimaliseren we specifiek voor Houten en directe omgeving: Bunnik, Schalkwijk, 't Goy. Geen verspilde energie aan bezoekers die nooit klant worden."
			}
		],
	},
    nieuwegein: {
		name: "Nieuwegein",
		slug: "nieuwegein",
		region: "Regio Utrecht",
		population: "65.000 inwoners",
		description:
			"Nieuwegein combineert stedelijke voorzieningen met een groene omgeving. Oorspronkelijk gebouwd als overloopgemeente voor Utrecht, heeft de stad een eigen identiteit ontwikkeld met een sterk MKB-klimaat.",
		businessContext:
			"Met City Plaza als winkelhart en diverse bedrijventerreinen trekt Nieuwegein zowel lokale als regionale klanten. Online zichtbaarheid bepaalt of klanten uit Utrecht en omgeving jouw bedrijf vinden of naar de concurrent gaan.",
		localFocus:
			"Nieuwegein is praktisch ingesteld. Ondernemers hier waarderen directheid en resultaat. Geen poespas, wel een website die doet wat 'ie moet doen: klanten aantrekken en converteren.",
		nearbyAreas: ["IJsselstein", "Utrecht", "Houten", "Vianen"],
		landmarks: "City Plaza, Fort Vreeswijk, Stadsplein",
		stats: {
			businesses: "6.200+ ondernemers",
			mainIndustry: "MKB & Groothandel",
			economicFact: "Nieuwegein heeft meer dan 35 hectare aan bedrijventerreinen met directe A2/A27 toegang",
			founded: "Gemeente sinds 1971"
		},
		targetIndustries: ["Groothandel", "Logistiek", "Automotive", "Bouwbedrijven", "Installateurs"],
		faqs: [
			{
				question: "Nieuwegein is praktisch ingesteld. Zijn jullie dat ook?",
				answer: "Absoluut. Geen eindeloze vergaderingen of brainstormsessies. Eén gesprek, wij gaan aan de slag, binnen 7 dagen online. €595 vast. Dat is het. Praktischer wordt het niet."
			},
			{
				question: "Ik zit op een bedrijventerrein aan de A2. Hebben jullie ervaring met B2B?",
				answer: "Ja. Nieuwegein heeft 35 hectare aan bedrijventerreinen. We bouwen websites voor groothandels, installateurs en logistieke bedrijven. B2B-klanten zoeken ook online. Die moet je kunnen vinden."
			},
			{
				question: "Mijn klanten komen uit Utrecht én Nieuwegein. Kan de website beide aanspreken?",
				answer: "We optimaliseren voor meerdere regio's. Nieuwegein ligt strategisch: met de juiste zoekwoorden bereik je klanten uit Utrecht, IJsselstein en Houten. Die brede dekking zit in de prijs."
			},
			{
				question: "Ik heb een installatiebedrijf. Is een website €595 waard?",
				answer: "Eén nieuwe opdracht via je website verdient de investering terug. Installateurs worden steeds vaker online gezocht. 'Loodgieter Nieuwegein' of 'cv-ketel storing': wie bovenaan staat, krijgt de klus."
			},
			{
				question: "City Plaza heeft veel concurrentie. Hoe val ik op?",
				answer: "Online zichtbaarheid. Mensen zoeken 'schoenenwinkel Nieuwegein' of 'kado City Plaza' voordat ze komen. Een goede website met lokale SEO zorgt dat ze jou vinden, niet de buurman."
			}
		],
	},
    geldermalsen: {
		name: "Geldermalsen",
		slug: "geldermalsen",
		region: "Rivierenland",
		population: "27.000 inwoners",
		description:
			"Geldermalsen ligt centraal in de Betuwe en vormt een belangrijk knooppunt in het Rivierenland. Met goede verbindingen naar Utrecht, Den Bosch en Nijmegen is het een strategische locatie voor ondernemers.",
		businessContext:
			"In het Rivierenland kiezen klanten vaak lokaal. Een sterke online aanwezigheid zorgt ervoor dat je gevonden wordt door iedereen in de wijde omgeving: van Tiel tot Culemborg, van Leerdam tot Zaltbommel.",
		localFocus:
			"De Betuwe kent een eigen mentaliteit: nuchter, betrouwbaar, en wars van opsmuk. Wij maken websites die bij deze cultuur passen. Professioneel zonder pretentie, effectief zonder poespas.",
		nearbyAreas: ["Beesd", "Meteren", "Buurmalsen", "Deil"],
		landmarks: "Station Geldermalsen, Landgoed Doddendael",
		stats: {
			businesses: "2.400+ ondernemers",
			mainIndustry: "Agribusiness & Transport",
			economicFact: "Geldermalsen is een logistieke hub met IC-station en directe verbinding naar Randstad én Brabant",
			founded: "Gemeente West Betuwe sinds 2019"
		},
		targetIndustries: ["Schilders & Klussenbedrijven", "Agrarisch", "Transport & Logistiek", "Ambachtelijke beroepen"],
		relatedProject: "schildersbedrijf-visser",
		faqs: [
			{
				question: "De Betuwe is nuchter. Geen verkooppraatjes dus?",
				answer: "Precies. €595 voor een website, binnen 7 dagen klaar, hosting inbegrepen. Geen gedoe, geen kleine lettertjes. Dat is het. Zo werken wij, zo werkt de Betuwe."
			},
			{
				question: "Jullie hebben een schildersbedrijf hier geholpen. Werken jullie veel met ambachtslieden?",
				answer: "Ja. Schilders, loodgieters, timmerlieden: we weten hoe je website er moet uitzien om vertrouwen te wekken. Voorbeelden van je werk, duidelijke contactgegevens, en vindbaar op 'schilder Geldermalsen'. Dat werkt."
			},
			{
				question: "Ik bedien klanten in heel West Betuwe. Kan de website dat aan?",
				answer: "We optimaliseren voor de hele regio. Beesd, Meteren, Deil, Buurmalsen: mensen uit al die dorpen zoeken online. Met de juiste zoekwoorden bereik je ze allemaal."
			},
			{
				question: "Station Geldermalsen trekt forenzen. Kan ik die bereiken?",
				answer: "Slimme vraag. Forenzen zoeken lokale diensten online: kapper, garage, afhaalrestaurant. Een website die goed scoort op die zoektermen trekt klanten die elke dag langs je bedrijf rijden."
			},
			{
				question: "Agrarische sector is groot hier. Bouwen jullie ook voor boeren?",
				answer: "Ja. Landwinkels, zorgboerderijen, loonwerkers: een website helpt je om klanten buiten je directe netwerk te bereiken. Vooral voor nevenactiviteiten als recreatie of verkoop aan particulieren is online zichtbaarheid waardevol."
			}
		],
	},
    tiel: {
		name: "Tiel",
		slug: "tiel",
		region: "Rivierenland",
		population: "42.000 inwoners",
		description:
			"Tiel is de grootste stad van het Rivierenland en bekend van de Fruitcorso. Als regionaal centrum trekt de stad klanten uit de hele Betuwe voor winkelen, dienstverlening en horeca.",
		businessContext:
			"Als ondernemer in Tiel bedien je niet alleen de stad zelf, maar ook de wijde omgeving. Inwoners uit dorpen als Zoelen, Wadenoijen en Kapel-Avezaath komen naar Tiel voor hun aankopen. Een goede website vergroot je bereik in heel West-Betuwe.",
		localFocus:
			"Tiel is trots op haar identiteit als fruitstad en regiocentrum. Ondernemers hier zijn ambitieus maar met beide benen op de grond. Wij bouwen websites die deze balans weerspiegelen.",
		nearbyAreas: ["Zoelen", "Drumpt", "Kapel-Avezaath", "Wamel"],
		landmarks: "Fruitcorso, Flipje, Agnietenstraat",
		stats: {
			businesses: "3.800+ ondernemers",
			mainIndustry: "Retail & Food",
			economicFact: "Tiel trekt jaarlijks 100.000+ bezoekers naar de Fruitcorso – de grootste in Nederland",
			founded: "Stadsrechten sinds 1200"
		},
		targetIndustries: ["Retail & Winkels", "Horeca & Catering", "Interieur & Design", "Schoonheidssalons"],
		relatedProject: "byshakir",
		faqs: [
			{
				question: "Tiel is het centrum van de Betuwe. Bereik ik ook de omliggende dorpen?",
				answer: "Dat is precies het punt. Mensen uit Zoelen, Drumpt, Kapel-Avezaath zoeken online voordat ze naar Tiel komen. 'Kapper Tiel' of 'restaurant Rivierenland': met de juiste zoekwoorden vinden ze jou."
			},
			{
				question: "Jullie hebben By Shakir gemaakt. Werken jullie vaker met luxe winkels?",
				answer: "Ja. Voor premium producten is uitstraling alles. Een website die er goedkoop uitziet past niet bij een luxe interieurzaak. We weten hoe je kwaliteit uitstraalt online, zonder kitscherig te worden."
			},
			{
				question: "Ik zit in de Agnietenstraat. Hoe trek ik meer winkelend publiek?",
				answer: "Mensen zoeken 'winkelen Tiel' of specifieke producten voordat ze komen. Een website met je assortiment, openingstijden en locatie zorgt dat ze bij jou terechtkomen. Niet bij de concurrent twee deuren verder."
			},
			{
				question: "De Fruitcorso trekt 100.000 bezoekers. Kan ik daar iets mee?",
				answer: "Absoluut. Bezoekers zoeken 'parkeren Tiel Fruitcorso' of 'eten Tiel centrum'. Een website die daarop scoort trekt klanten tijdens het evenement. We kunnen zelfs een speciale Fruitcorso-pagina maken."
			},
			{
				question: "Is €595 niet te goedkoop voor een professionele website?",
				answer: "We zijn efficiënt, niet goedkoop. Geen kantoor aan de Agnietenstraat, geen projectmanagers, geen weken vergaderen. Wel een website die er even goed uitziet als bij bureaus die €3.000 vragen. Kijk maar naar By Shakir."
			}
		],
	},
    vianen: {
		name: "Vianen",
		slug: "vianen",
		region: "Regio Utrecht",
		population: "20.000 inwoners",
		description:
			"Vianen is een historisch stadje aan de Lek met een monumentale binnenstad. De perfecte ligging tussen Utrecht en Gorinchem maakt het aantrekkelijk voor ondernemers die beide markten willen bedienen.",
		businessContext:
			"Vianen profiteert van haar ligging langs de A2 en A27. Bedrijven hier trekken klanten uit zowel de Randstad als het Rivierenland. Online zichtbaarheid in beide regio's is daarom belangrijk.",
		localFocus:
			"De Vianense binnenstad ademt historie, maar de ondernemers kijken vooruit. Wij bouwen moderne websites die de charme van de stad combineren met de professionaliteit die klanten verwachten.",
		nearbyAreas: ["Lexmond", "Hagestein", "Nieuwegein", "Leerdam"],
		landmarks: "Voorstraat, Lekpoort, Binnenhaven",
		stats: {
			businesses: "1.900+ ondernemers",
			mainIndustry: "Handel & Logistiek",
			economicFact: "Vianen was historisch een vrijplaats – ondernemers die elders niet welkom waren vestigden zich hier",
			founded: "Stadsrechten sinds 1336"
		},
		targetIndustries: ["E-commerce & Handel", "Accountants & Administratie", "Makelaars", "Adviesbureaus"],
		faqs: [
			{
				question: "Vianen ligt tussen Utrecht en Gorinchem. Kan ik beide markten bereiken?",
				answer: "Precies waarom Vianen strategisch is. We optimaliseren voor beide regio's. 'Accountant Vianen' bereikt lokaal, 'boekhouder regio Utrecht' trekt de Randstad aan. Die dubbele dekking zit in de website."
			},
			{
				question: "De Voorstraat heeft veel kleine ondernemers. Passen jullie daar?",
				answer: "€595 is precies bedoeld voor ondernemers als jullie. Professionele uitstraling zonder het budget van grote ketens. De Voorstraat verdient websites die passen bij de kwaliteit van de winkels."
			},
			{
				question: "Ik heb een adviesbureau. Helpt een website bij B2B?",
				answer: "Zakelijke klanten oriënteren zich ook online. Een professionele website wekt vertrouwen voordat het eerste gesprek plaatsvindt. Voor adviesbureaus en accountants is dat cruciaal."
			},
			{
				question: "Vianen was een vrijplaats voor ondernemers. Zijn jullie ook ondernemersvriendelijk?",
				answer: "We begrijpen ondernemers. Geen vergaderingen van drie uur, geen facturen die oplopen, geen gedoe. Eén gesprek, 7 dagen later een website. Dat is ondernemersvriendelijk."
			},
			{
				question: "Werken jullie ook voor makelaars?",
				answer: "Ja. Vianen ligt aantrekkelijk voor woningzoekers uit de Randstad. Een makelaar met een goede website die scoort op 'woning kopen Vianen' heeft een voorsprong op de concurrentie."
			}
		],
	},
    ijsselstein: {
		name: "IJsselstein",
		slug: "ijsselstein",
		region: "Regio Utrecht",
		population: "35.000 inwoners",
		description:
			"IJsselstein is een historische vestingstad met een levendige binnenstad en een sterke lokale gemeenschap. De Gerbrandytoren aan de horizon symboliseert de verbinding tussen traditie en moderniteit.",
		businessContext:
			"IJsselsteiners zijn gehecht aan hun stad en kiezen graag lokaal. Maar ze verwachten wel dat lokale ondernemers even professioneel overkomen als de grote ketens. Een goede website is geen luxe, maar noodzaak.",
		localFocus:
			"Van de weekmarkt op de Overtoom tot de speciaalzaken in de Benschopperstraat: IJsselstein heeft een eigen winkelcultuur. Wij begrijpen deze dynamiek en bouwen websites die lokale klanten aanspreken.",
		nearbyAreas: ["Lopik", "Nieuwegein", "Montfoort", "Benschop"],
		landmarks: "Gerbrandytoren, Overtoom, Walkade",
		stats: {
			businesses: "3.200+ ondernemers",
			mainIndustry: "Detailhandel & Ambacht",
			economicFact: "IJsselstein heeft de langste winkelstraat van de regio met meer dan 100 speciaalzaken",
			founded: "Stadsrechten sinds 1310"
		},
		targetIndustries: ["Speciaalzaken & Winkels", "Kappers & Barbershops", "Ambachtslieden", "Fysiotherapie & Zorg"],
		faqs: [
			{
				question: "IJsselstein heeft meer dan 100 speciaalzaken. Hoe val ik op?",
				answer: "Online zichtbaarheid. Mensen zoeken 'bakker IJsselstein' of 'kapper Benschopperstraat' voordat ze de deur uitgaan. Wie bovenaan Google staat, krijgt de klant. Zo simpel is het."
			},
			{
				question: "IJsselsteiners kiezen lokaal. Waarom dan toch een website?",
				answer: "Juist daarom. Ze willen lokaal kopen, maar oriënteren zich eerst online. Geen website? Dan besta je niet. Een slechte website? Dan kies ik de concurrent. Zo denkt de moderne lokale klant."
			},
			{
				question: "Ik heb een kapsalon. Is €595 genoeg voor een goede website?",
				answer: "Meer dan genoeg. Een kapsalon heeft geen webshop nodig. Wel: mooie foto's van je werk, openingstijden, prijzen, en een manier om afspraken te maken. Dat bouwen we voor €595."
			},
			{
				question: "Werken jullie ook voor fysiotherapeuten en zorgverleners?",
				answer: "Ja. Zorg is een groeiende sector in IJsselstein. Een professionele website met duidelijke informatie over behandelingen, vergoedingen en aanmelden wekt vertrouwen bij nieuwe patiënten."
			},
			{
				question: "Ik sta op de weekmarkt aan de Overtoom. Helpt een website dan?",
				answer: "Zeker. Vaste klanten vinden je sowieso. Maar nieuwe klanten zoeken 'markt IJsselstein' of 'verse groenten regio Utrecht'. Een simpele website met je aanbod en standplaats trekt nieuw publiek."
			}
		],
	},
    beesd: {
		name: "Beesd",
		slug: "beesd",
		region: "Rivierenland",
		population: "6.000 inwoners",
		description:
			"Beesd is een karakteristiek Betuws dorp met een actieve ondernemersgemeenschap. Ondanks het kleinere formaat kent Beesd verrassend veel lokale bedrijvigheid, van hoveniers tot horecazaken.",
		businessContext:
			"In een kleiner dorp als Beesd is persoonlijke reputatie alles. Maar nieuwe klanten oriënteren zich ook hier steeds vaker online. Een professionele website versterkt je lokale reputatie en trekt klanten uit de omliggende dorpen.",
		localFocus:
			"In Beesd kent iedereen elkaar. Wij bouwen websites die deze persoonlijke sfeer uitstralen. Professioneel, maar toegankelijk. Geen grote-stadse uitstraling, wel een website die past bij de Betuwse nuchterheid.",
		nearbyAreas: ["Rumpt", "Gellicum", "Rhenoy", "Geldermalsen"],
		landmarks: "Hervormde Kerk, Dorpsstraat",
		stats: {
			businesses: "650+ ondernemers",
			mainIndustry: "Hoveniers & Groenvoorziening",
			economicFact: "Beesd ligt in het hart van de fruitteelt – meer dan 30% van de lokale bedrijvigheid is agrarisch",
			founded: "Eerste vermelding 850 n.Chr."
		},
		targetIndustries: ["Hoveniers & Tuincentra", "Loonwerkers", "B&B's & Recreatie", "Timmerlieden & Aannemers"],
		faqs: [
			{
				question: "Beesd is klein. Heeft een website hier wel zin?",
				answer: "Juist in een klein dorp. Iedereen kent je, maar nieuwe klanten niet. Mensen die zoeken naar 'hovenier Betuwe' of 'timmerman West Betuwe' vinden jou. Dat zijn klanten die je anders mist."
			},
			{
				question: "Veel hoveniers hier. Hoe onderscheid ik me?",
				answer: "Online aanwezigheid. De meeste hoveniers in de Betuwe hebben geen website of een verouderde. Wie wél professioneel online staat, krijgt de klanten die Googelen. Dat zijn er steeds meer."
			},
			{
				question: "Ik heb een B&B. Werkt dat met zo'n website?",
				answer: "Perfect. Toeristen zoeken 'overnachten Betuwe' of 'B&B fruitstreek'. Een website met foto's, prijzen en boekingsmogelijkheid trekt gasten die anders naar Booking gaan. Zonder commissie."
			},
			{
				question: "Mijn klanten komen uit de hele regio. Kan de website dat?",
				answer: "We optimaliseren voor Beesd én omgeving: Rumpt, Gellicum, Rhenoy, Geldermalsen. Mensen zoeken op regio, niet alleen op dorp. Die bredere dekking zit in de prijs."
			},
			{
				question: "Is €595 niet te veel voor een dorp als Beesd?",
				answer: "Eén nieuwe klant via je website en je hebt het terugverdiend. Een hovenier, timmerman of B&B-eigenaar haalt dat er binnen een maand uit. De vraag is niet of het te duur is, maar of je het kunt missen."
			}
		],
	},
    buren: {
		name: "Buren",
		slug: "buren",
		region: "Rivierenland",
		population: "3.000 inwoners",
		description:
			"Buren is een pittoresk vestingstadje met een rijke historie. Ooit de residentie van het huis Oranje-Nassau. Het stadje trekt toeristen en heeft een actieve gemeenschap van lokale ondernemers.",
		businessContext:
			"Als ondernemer in Buren heb je een unieke positie: een historische setting die toeristen trekt, gecombineerd met een loyale lokale klantenkring. Een website die beide doelgroepen aanspreekt vergroot je bereik aanzienlijk.",
		localFocus:
			"Buren heeft een bijzondere uitstraling die je website moet weerspiegelen. Wij begrijpen de balans tussen het historische karakter en de moderne wensen van ondernemers die hier actief zijn.",
		nearbyAreas: ["Beusichem", "Maurik", "Zoelen", "Lienden"],
		landmarks: "Museum Buren, Stadsmuur, Markt",
		stats: {
			businesses: "350+ ondernemers",
			mainIndustry: "Toerisme & Horeca",
			economicFact: "Buren was de geboorteplaats van Anna van Buren, stammoeder van het huis Oranje-Nassau",
			founded: "Stadsrechten sinds 1395"
		},
		targetIndustries: ["Restaurants & Cafés", "Kunst & Antiek", "Bed & Breakfasts", "Ambachtelijke producten"],
		faqs: [
			{
				question: "Buren trekt toeristen. Hoe vind ik die online?",
				answer: "Toeristen zoeken 'restaurant Buren' of 'wat te doen Rivierenland' voordat ze komen. Een website die daarop scoort trekt gasten die je anders mist. Vooral dagjesmensen beslissen ter plekke via hun telefoon."
			},
			{
				question: "Ik heb een antiekzaak. Past een moderne website daarbij?",
				answer: "Modern en klassiek gaan prima samen. Een strakke website met mooie foto's van je collectie straalt kwaliteit uit. Dat past bij antiek. Mensen verwachten tegenwoordig online te kunnen kijken voordat ze langskomen."
			},
			{
				question: "Mijn B&B moet concurreren met Booking en Airbnb. Kan dat?",
				answer: "Met eigen boekingen verdien je meer. Een website met directe boekingsmogelijkheid bespaart je de 15-20% commissie van platforms. Gasten die 'B&B Buren' zoeken, vinden jou. Die willen vaak juist niet via Booking."
			},
			{
				question: "Buren is klein. Bereik ik ook mensen van buiten?",
				answer: "Dat is het punt. Lokale klanten kennen je al. Een website trekt bezoekers uit Beusichem, Maurik, Lienden en toeristen uit heel Nederland. Dat zijn klanten die je zonder website niet vindt."
			},
			{
				question: "Jullie zitten zelf in Buren. Voordeel?",
				answer: "We kennen het stadje, de ondernemers, de sfeer. We weten dat Buren anders is dan Tiel of Utrecht. Die kennis zit in de websites die we bouwen. Plus: je kunt gewoon langskomen voor een kop koffie."
			}
		],
	},
};

export const getCityBySlug = (slug: string): CityData | undefined => {
    return cities[slug.toLowerCase()];
};

export const getAllCities = (): CityData[] => {
    return Object.values(cities);
};
