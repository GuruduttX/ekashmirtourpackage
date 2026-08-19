/**
 * Per-festival page content for /festivals/[slug]/ — SOP §2.6.
 *
 * SPLIT FROM src/data/festivals.ts ON PURPOSE. That file is the HUB contract:
 * the fields every card and the ItemList need, kept small so the hub stays
 * cheap to render. This file is the DETAIL payload — the sections that exist
 * only on the individual page (what happens · how to attend · history · tips).
 * The hub never imports this, so adding a paragraph here cannot slow /festivals/
 * down, and a festival can go live on the hub before its long-form copy exists.
 *
 * CMS SWAP: this becomes the read-through when festivals move to Mongo. Mirror
 * src/lib/experienceActivityPage.ts — one async getter per page, keyed by slug,
 * falling back to whatever is still static here. Nothing in the components
 * below reads this module directly; they take props, so the swap is one file.
 *
 * DATA HONESTY — the same rule the hub file states at length, restated because
 * this is where it gets broken:
 *   • NO EXACT DATES anywhere in this file. Six of the eight festivals move
 *     every year. Windows in prose only; confirmed ISO dates live on the
 *     Festival record behind `datesVerified`, and gate the Event schema.
 *   • NO PRICES presented as current. `entry` on the hub record says what kind
 *     of cost it is, not a number that will be stale next season.
 *   • Sartaj tips are the SOP A4/A8 information-gain payload — on-ground truths
 *     an aggregator cannot restate. Do not pad them with generic travel advice.
 */

import type {
  FestivalAttendStep,
  FestivalFact,
  FestivalFaq,
  FestivalHistoryBlock,
  FestivalPhoto,
} from "@/types/festivalTypes";

export type FestivalDetail = {
  /**
   * Extra at-a-glance rows beyond the ones derived from the Festival record
   * (window · duration · venue · entry). Use for facts specific to this
   * occasion: "Registration", "Fitness", "Dress code".
   */
  facts?: FestivalFact[];
  /** Opening prose under the answer block — what the occasion actually is. */
  intro: string;
  /** What happens on the ground, as discrete moments a reader can picture. */
  whatHappens: string[];
  attend: FestivalAttendStep[];
  history: FestivalHistoryBlock[];
  /** On-ground truths. Two to four, per SOP §2.3 item 7. */
  sartajTips: string[];
  /** Page-specific FAQs. Hub-level questions stay in festivalFaqs.ts. */
  faqs: FestivalFaq[];
  /**
   * Per-festival photography. Optional: falls back to the shared festival reel
   * in the page, because a stock photo captioned as a named festival is worse
   * than an honest generic strip. Fill this in when real photos land.
   */
  gallery?: FestivalPhoto[];
};

export const FESTIVAL_DETAILS: Record<string, FestivalDetail> = {
  "tulip-festival": {
    facts: [
      { id: "best-time", label: "Best time of day", value: "At opening, around 9 AM" },
      { id: "how-long", label: "Time needed", value: "1 to 2 hours in the garden" },
      { id: "booking", label: "Book ahead", value: "Stays and cabs, 6–8 weeks" },
    ],
    intro:
      "The Indira Gandhi Memorial Tulip Garden sits on the Zabarwan foothills above Dal Lake, terraced down the slope in seven levels. For about three weeks each spring it holds well over a million bulbs in flower — the largest tulip garden in Asia, and the one occasion in the Kashmir year that changes what the valley looks like rather than adding an event to it.",
    whatHappens: [
      "The garden opens for the season the moment the bloom is judged ready, and the announcement comes only days ahead.",
      "Terraced beds are planted in bands of colour, so the whole slope reads as stripes from the upper walkways.",
      "Almond blossom at Badamwari and cherry blossom across Srinagar fall in the same fortnight.",
      "Cultural evenings and a handicrafts market run alongside the garden through the season.",
    ],
    attend: [
      {
        id: "time-your-trip",
        title: "Time the trip to the bloom, not to a date",
        body: "The window is reliably late March into mid April, but the exact opening is called weeks out once the flowers actually break. Plan for the middle of the window rather than its edges, and treat any date you see published earlier than that as a guess.",
      },
      {
        id: "book-early",
        title: "Book stays and cabs six to eight weeks out",
        body: "This is the sharpest demand spike of the Kashmir year. Srinagar hotels, Dal Lake houseboats and cabs all price up and sell out together, and the ones left late are the ones nobody wanted.",
      },
      {
        id: "getting-there",
        title: "Getting to the garden",
        body: "The garden is on Cheshma Shahi Road, roughly 8 km from Lal Chowk and a short drive from the Boulevard. Any Srinagar cab will run you there; in peak bloom the last stretch is slow, so leave earlier than the distance suggests.",
      },
      {
        id: "on-the-day",
        title: "Go at opening",
        body: "Gates open around 9 AM. The first hour is quiet enough to photograph the beds without a crowd in frame; by late morning the walkways are full and stay that way until closing.",
      },
    ],
    history: [
      {
        id: "origin",
        title: "A garden built to extend the season",
        body: "The garden was laid out in the mid-2000s on a terraced slope that had been a soil-conservation site, with the specific aim of pulling visitors into Kashmir before the summer season proper began. It worked — the bloom now anchors the entire spring travel calendar for the valley.",
      },
      {
        id: "why-here",
        title: "Why tulips grow here at all",
        body: "The Zabarwan foothills give the crop what it needs: cold winters that chill the bulbs, a sharp warm spring that triggers the break, and free-draining terraced soil. It is the same combination that makes the valley's orchards work, applied to a flower most of India cannot grow outdoors.",
      },
    ],
    sartajTips: [
      "Go on a weekday if you have any choice at all. Weekend crowds in peak bloom are a different experience entirely, and locals come out in numbers too.",
      "The upper terraces are worth the climb — from the top you see the colour bands as bands, which is the photograph everyone means to take and most people miss from the bottom.",
      "Pair it with Badamwari the same morning. The almond blossom is a ten-minute drive away and usually peaks in the same fortnight, and almost nobody plans for both.",
    ],
    faqs: [
      {
        id: "tulip-exact-dates",
        question: "What are the exact Tulip Festival dates this year?",
        answer:
          "They are not fixed in advance. The garden announces its opening once the bloom actually starts, usually only days ahead, and the season runs about three weeks from there — reliably somewhere between late March and mid April. We publish confirmed dates on this page as soon as the garden announces them rather than printing an estimate that turns out wrong.",
      },
      {
        id: "tulip-ticket",
        question: "Is there an entry ticket for the tulip garden?",
        answer:
          "Yes, a small per-head entry fee collected at the gate, with a lower rate for children. It is paid on the spot; there is no advance booking and no queue-skip ticket, so arriving early is the only thing that saves you time.",
      },
      {
        id: "tulip-how-long",
        question: "How long should I spend at the tulip garden?",
        answer:
          "One to two hours covers it comfortably, including walking up to the top terrace and back. It is a garden visit rather than a day out, so most people pair it with Nishat or Shalimar Bagh, or with the Boulevard, in the same half day.",
      },
      {
        id: "tulip-missed-bloom",
        question: "What if I arrive after the bloom is over?",
        answer:
          "The garden closes for the season once the flowers go over, so there is nothing to see there. Late April is still a good time to be in Kashmir though — the Mughal gardens are at their best, the orchards are in leaf, and Gulmarg and Pahalgam have opened up after the snow.",
      },
    ],
  },

  "amarnath-yatra": {
    facts: [
      { id: "registration", label: "Registration", value: "Compulsory, in advance" },
      { id: "medical", label: "Medical certificate", value: "Required, from an authorised doctor" },
      { id: "routes", label: "Routes", value: "Baltal (short, steep) or Pahalgam (traditional)" },
      { id: "altitude", label: "Cave altitude", value: "About 3,880 m" },
    ],
    intro:
      "The Amarnath Yatra is the annual pilgrimage to a cave shrine high in the Anantnag mountains, where an ice stalagmite forms and recedes with the season. It runs for roughly two months across July and August, with dates set each year by the Shri Amarnathji Shrine Board, and it is the single most logistically demanding thing a visitor can do in Kashmir.",
    whatHappens: [
      "Registered pilgrims travel in daily batches under a quota, with the route managed and escorted end to end.",
      "Two approaches reach the cave: Baltal from the north, short and very steep; Pahalgam from the south, longer and traditional.",
      "Langars — free community kitchens — line both routes for the duration of the yatra.",
      "Helicopter services operate on both routes in most years, cutting the walk to the final stretch.",
    ],
    attend: [
      {
        id: "register",
        title: "Register as soon as registration opens",
        body: "Registration through the Shrine Board is compulsory and the daily quota fills. It opens some weeks before the yatra begins and is handled through designated bank branches and the Board's own channels — there is no way to join a batch without it.",
      },
      {
        id: "medical",
        title: "Get the compulsory medical certificate",
        body: "A certificate from an authorised doctor, issued within the Board's stated window before travel, is part of the registration. It is checked, not a formality: the cave sits near 3,900 m and the Board turns people back at the access control gates.",
      },
      {
        id: "choose-route",
        title: "Choose your route honestly",
        body: "Baltal is around 14 km each way and can be done in a long day by someone genuinely fit — it is short because it is steep. Pahalgam is roughly 32 km over three to five days via Chandanwari, Sheshnag and Panchtarni, and is the easier walk spread over more days.",
      },
      {
        id: "prepare",
        title: "Train and acclimatise before you arrive",
        body: "Start walking daily several weeks out. Both routes cross high, cold, thin-air ground where weather turns fast, and altitude illness is the most common reason people abandon the trek — not fitness on flat ground.",
      },
    ],
    history: [
      {
        id: "significance",
        title: "What the cave holds",
        body: "The shrine is a natural cave where seeping water freezes into a lingam-shaped ice formation that waxes and wanes across the season. It is one of the most significant Shiva pilgrimages in the subcontinent, and in the telling associated with it, the cave is where Shiva related the secret of immortality to Parvati.",
      },
      {
        id: "the-yatra-today",
        title: "A pilgrimage run as an operation",
        body: "The modern yatra is administered by the Shri Amarnathji Shrine Board with daily quotas, registered batches, medical gates and a large support presence along both routes. Understanding that is the difference between a smooth pilgrimage and being turned back — the schedule is not something you negotiate on the ground.",
      },
    ],
    sartajTips: [
      "Baltal being 'the short route' misleads people every single year. It is short because it climbs hard the whole way; if you have not walked steep ground recently, Pahalgam over more days is the kinder choice.",
      "Book the helicopter the day registration allows it if you intend to fly. The seats are limited, and the walk from the helipad at Panjtarni to the cave is still a real one on foot.",
      "Carry cash. Card and network coverage thin out badly past the base camps, and the langars are free but everything else on the route is not.",
      "Pack for cold and wet even in August. Rain at that altitude is the thing that ends most people's yatra, not the climb.",
    ],
    faqs: [
      {
        id: "amarnath-dates",
        question: "When does the Amarnath Yatra start this year?",
        answer:
          "The Shri Amarnathji Shrine Board announces the dates each year, usually a few months ahead, and the yatra reliably falls across July and August for about two months. Because the dates are set annually rather than fixed, we publish them here once the Board confirms them instead of estimating.",
      },
      {
        id: "amarnath-registration",
        question: "Can I do the yatra without registering?",
        answer:
          "No. Registration is compulsory, checked at access control on both routes, and tied to a daily quota and a specific travel date. A medical certificate from an authorised doctor is part of it. There is no on-the-spot option that substitutes for it.",
      },
      {
        id: "amarnath-which-route",
        question: "Baltal or Pahalgam — which route should I take?",
        answer:
          "Baltal if you are fit and short on days: roughly 14 km each way, very steep, doable in a long day. Pahalgam if you want the traditional walk or are less confident on gradient: about 32 km over three to five days through Chandanwari, Sheshnag and Panchtarni, with the climbing spread out. Neither is easy, and the deciding factor is days available and hill fitness, not age.",
      },
      {
        id: "amarnath-helicopter",
        question: "Is there a helicopter to the Amarnath cave?",
        answer:
          "Helicopter services run on both routes in most years, between the base camps and the upper helipads. They do not land at the cave — there is still a walk at the end, and it is at altitude. Seats are limited and go quickly once bookings open.",
      },
    ],
  },

  "gulmarg-winter-festival": {
    facts: [
      { id: "altitude", label: "Gulmarg altitude", value: "About 2,650 m" },
      { id: "snow", label: "Snow condition", value: "Deepest base of the season" },
      { id: "gear", label: "Gear", value: "Rented on the slopes, charged separately" },
    ],
    intro:
      "The Gulmarg Winter Festival is a short winter-sports carnival held on the Gulmarg slopes at the height of the season — ski and snowboard races, snow sculpture, igloo building and live music, layered over what is already the best skiing window in India. It usually runs a few days somewhere between late December and February, once the snow base is deep enough to hold events.",
    whatHappens: [
      "Ski and snowboard races run on the main slopes below the Gondola.",
      "Snow sculpture and igloo building take over the flat ground near the base.",
      "Live music and cultural evenings run alongside the sport.",
      "The festival falls inside the deepest-snow weeks, so the skiing itself is at its best.",
    ],
    attend: [
      {
        id: "getting-there",
        title: "Getting to Gulmarg",
        body: "Gulmarg is about 50 km from Srinagar, an hour and a half to two hours by road in normal conditions. In deep winter the stretch beyond Tangmarg needs snow chains or a snow-capable vehicle, and a standard Srinagar cab cannot always make the last climb.",
      },
      {
        id: "stay",
        title: "Stay in Gulmarg, not Srinagar",
        body: "Day-tripping into a festival that runs on the slopes wastes the best hours of light on the road, and the road is the part that closes in weather. Rooms in Gulmarg itself are limited and go early in the season.",
      },
      {
        id: "gondola",
        title: "Book the Gondola separately, and early",
        body: "The Gondola is not part of the festival and is ticketed on its own, in two phases. It is the busiest it gets all year during the festival window, so book the phase you want as far ahead as the system allows.",
      },
      {
        id: "gear",
        title: "Gear and instructors are hired on the spot",
        body: "Skis, boards, boots and clothing all rent locally at the base, and instructors are hired by the hour or the day. If you have never skied, book an instructor rather than just gear — the main slope during the festival is not the place to learn unattended.",
      },
    ],
    history: [
      {
        id: "gulmarg-as-a-ski-resort",
        title: "Kashmir's ski mountain",
        body: "Gulmarg has been a skiing destination since the early twentieth century and is now the highest lift-served skiing in India, with the Gondola climbing towards Apharwat. Its reputation rests on long, ungroomed off-piste terrain rather than manicured runs — which is why it draws skiers who have options elsewhere.",
      },
      {
        id: "why-a-festival",
        title: "Why the festival exists",
        body: "The winter festival was built to give the peak snow weeks a fixed occasion — something that turns a ski season into a reason to travel on particular dates. It is a young event by valley standards, and its dates move with the snow, not the calendar.",
      },
    ],
    sartajTips: [
      "Srinagar taxis cannot do the Gulmarg run in deep snow past Tangmarg. It is a separate local union vehicle from there up, and arranging that in advance saves an argument in the cold.",
      "Phase 1 of the Gondola is the one most visitors actually want in festival week. Phase 2 goes to genuine high-mountain terrain and closes on weather without warning.",
      "Bring proper gloves and eye protection from home. Rented outer layers are fine; rented gloves and goggles are where the local kit is weakest.",
    ],
    faqs: [
      {
        id: "gulmarg-festival-dates",
        question: "When is the Gulmarg Winter Festival held?",
        answer:
          "Across a few days somewhere between late December and February, decided each year once the snow base is deep enough to run events on. Because it is called on snow conditions rather than fixed to a date, we list the window here and add confirmed dates once they are announced.",
      },
      {
        id: "gulmarg-non-skier",
        question: "Is the festival worth it if I don't ski?",
        answer:
          "Yes, though for different reasons. The races are watchable from the base area for free, the snow sculpture and igloo building are the visual draw, and the Gondola, sledging and the snow itself are what most non-skiing visitors come for anyway. You do not need to be on skis to have a full day there.",
      },
      {
        id: "gulmarg-entry",
        question: "Do I need a ticket for the winter festival?",
        answer:
          "Watching is free. What costs money is everything you do yourself — Gondola tickets, ski or snowboard rental, instructors, sledges. Race entry, where it is open to visitors at all, is registered separately on the ground.",
      },
    ],
  },

  "saffron-festival": {
    facts: [
      { id: "best-time", label: "Best time of day", value: "First light, before the flowers open fully" },
      { id: "distance", label: "From Srinagar", value: "About 15 km to Pampore" },
      { id: "window", label: "Bloom length", value: "Roughly two weeks, weather-dependent" },
    ],
    intro:
      "For about a fortnight each autumn the saffron fields around Pampore, on the Srinagar–Anantnag road, turn purple as the crocus flowers open. The harvest is marked with field walks and grading demonstrations. It is the shortest window of the Kashmir festival year and the least forgiving — arriving a week late means arriving to bare fields.",
    whatHappens: [
      "Whole terraces of crocus open at once, at their best in the first hours of daylight.",
      "Picking is done by hand at dawn, flower by flower, across the family plots.",
      "Stigmas are separated and graded in the villages, often demonstrated for visitors.",
      "The bloom overlaps the Chinar turning colour in Srinagar, which is the other reason to be here in autumn.",
    ],
    attend: [
      {
        id: "timing",
        title: "Come at dawn, in the right fortnight",
        body: "The window is late October into mid November and shifts with the weather. Within a day, first light is the time to be standing in a field — the colour is best before the sun is high and the pickers are working then, not later.",
      },
      {
        id: "getting-there",
        title: "Getting to Pampore",
        body: "Pampore is roughly 15 km from Srinagar on the highway towards Anantnag — half an hour by cab, and easy to combine with a drive to Pahalgam the same day. The fields run along both sides of the road, so there is no single gate to arrive at.",
      },
      {
        id: "etiquette",
        title: "These are working farms",
        body: "The fields are private plots being harvested, not a public garden. Ask before walking in and before photographing anyone; most families are welcoming, and being asked is the whole difference.",
      },
      {
        id: "buying",
        title: "Buying saffron",
        body: "Buy from a grading house or a grower in Pampore rather than a roadside stall, and expect real Kashmiri saffron to be expensive — the price is the first honest signal. Look for deep red stigmas with no yellow style attached.",
      },
    ],
    history: [
      {
        id: "pampore",
        title: "The saffron town",
        body: "Pampore's karewa — the raised, well-drained plateau soil above the Jhelum flood plain — is the reason saffron has been grown here for well over a thousand years. It remains India's principal saffron-growing belt, and Kashmiri saffron is graded among the most prized in the world.",
      },
      {
        id: "the-harvest",
        title: "Why it costs what it costs",
        body: "Each flower carries three red stigmas, picked by hand, in a window measured in days. The arithmetic behind saffron's price is simply the number of flowers and the number of hands — which is exactly what the harvest demonstrations set out to show.",
      },
    ],
    sartajTips: [
      "Ask a grower's permission and you will usually be walked into the field and shown the picking. Wander in unasked and you have a different afternoon.",
      "The purple is best in the first hour of light and the fields look ordinary by midday — this is genuinely a sunrise trip, not a flexible one.",
      "Pair it with the Chinars at Nishat and the Naseem Bagh grove the same week. Late October is the one time the valley's autumn colour and the saffron overlap.",
    ],
    faqs: [
      {
        id: "saffron-dates",
        question: "When exactly do the Pampore saffron fields bloom?",
        answer:
          "Late October into mid November, for roughly two weeks, with the precise start decided by that year's weather. It is the shortest window of any Kashmir festival — a week's error means missing it entirely — so we state the window rather than a date, and confirm on the ground each season.",
      },
      {
        id: "saffron-entry",
        question: "Is there an entry fee for the saffron fields?",
        answer:
          "No. The fields are working farmland along the highway at Pampore and are free to walk, with the owner's permission. What is ticketed at times are the organised harvest demonstrations and grading sessions run during the festival.",
      },
      {
        id: "saffron-buying",
        question: "How do I know the saffron I'm buying is real?",
        answer:
          "Buy in Pampore itself, from a grading house or the grower, and be suspicious of anything cheap — real Kashmiri saffron is among the most expensive spices in the world and a bargain price is the clearest warning sign there is. Good stigmas are deep red throughout, dry, and carry no yellow style.",
      },
    ],
  },

  "shikara-festival": {
    facts: [
      { id: "watching", label: "Where to watch", value: "Free, from the Boulevard footpath" },
      { id: "on-water", label: "On the water", value: "Hire a shikara for the day" },
      { id: "booking", label: "Booking", value: "Not needed to attend" },
    ],
    intro:
      "The Shikara Festival is a two-day carnival on Dal Lake, typically held over a weekend in July or August. Shikara and dragon-boat races run through the day and the festival closes with a parade of decorated boats along the Boulevard. It needs no ticket and no booking, which makes it the easiest festival in the valley to simply turn up to.",
    whatHappens: [
      "Shikara races along the Boulevard stretch, heat by heat through the day.",
      "Dragon-boat racing, which is the loudest and most watchable part.",
      "A parade of decorated shikaras to close, usually late in the afternoon.",
      "Food stalls, music and canoe polo along the lakefront across both days.",
    ],
    attend: [
      {
        id: "watching",
        title: "Watch free from the Boulevard",
        body: "The whole racing stretch runs alongside the Boulevard footpath, and the view from land is genuinely good. There is no ticket, no enclosure and no booking — you walk up and watch.",
      },
      {
        id: "on-the-water",
        title: "Or hire a shikara and watch from the water",
        body: "A hired shikara puts you level with the racing and out of the crowd. Agree the hire rate before you get in, as you would any other day, and go out well before the heats start — the ghats are congested once the crowd builds.",
      },
      {
        id: "where-to-stay",
        title: "Stay on the Boulevard or on a houseboat",
        body: "Anywhere along the Boulevard or on a Dal Lake houseboat puts the festival on your doorstep. This is high summer, so Srinagar is busy regardless of the festival — book stays for the season, not for the event.",
      },
      {
        id: "timing",
        title: "Afternoons are the show",
        body: "Racing builds through the day and the decorated-boat parade closes it, so late afternoon into evening is the part worth planning around. Mornings on the lake are for the floating market instead, which is its own reason to be up early.",
      },
    ],
    history: [
      {
        id: "the-shikara",
        title: "The boat the festival is named for",
        body: "The shikara is the flat-bottomed, canopied wooden boat that has done everything on Dal Lake for centuries — ferrying people, carrying vegetables from the floating gardens, and serving as a shopfront. The festival is, at bottom, a celebration of the boat itself and the families who have rowed them for generations.",
      },
      {
        id: "the-event",
        title: "A young festival, an old craft",
        body: "The organised festival is a recent addition to the calendar, created to give Dal Lake's boating community a public occasion and to draw visitors into the lake in high summer. The races and the boat-decorating tradition behind it are considerably older than the event.",
      },
    ],
    sartajTips: [
      "The best free view is the Boulevard stretch near Nehru Park, not the crowded middle — the boats come past close and there is room to stand.",
      "If you hire a shikara for the day, settle the price before boarding and go out early. Rates and patience both change once the crowd arrives.",
      "Do the floating vegetable market at dawn on the same day. It is on the same lake, over by 7 AM, and almost nobody combines the two.",
    ],
    faqs: [
      {
        id: "shikara-dates",
        question: "When is the Shikara Festival held?",
        answer:
          "Over a weekend in July or August, decided and announced by the tourism department each year. It runs for about two days. We publish the window rather than a fixed date because it moves within those two months from year to year.",
      },
      {
        id: "shikara-ticket",
        question: "Do I need a ticket for the Shikara Festival?",
        answer:
          "No. Watching from the Boulevard is free and there is no enclosure or booking involved. The only thing you would pay for is hiring a shikara to watch from the water, which is a normal boat hire arranged on the day.",
      },
      {
        id: "shikara-with-kids",
        question: "Is it worth taking children to?",
        answer:
          "It is one of the better festival days in the valley for children — dragon-boat racing is loud and easy to follow, the decorated-boat parade is the visual payoff, and the whole thing happens along a walkable lakefront with food stalls. Nothing about it requires standing still for long.",
      },
    ],
  },

  "kheer-bhawani-mela": {
    facts: [
      { id: "distance", label: "From Srinagar", value: "About 27 km to Tulmulla" },
      { id: "dress", label: "Dress code", value: "Modest; heads covered in the temple" },
      { id: "duration", label: "Time needed", value: "Half a day from Srinagar" },
    ],
    intro:
      "The Kheer Bhawani Mela is a single-day gathering at the Ragnya Devi temple at Tulmulla in Ganderbal, about 27 km from Srinagar, held on Jyeshtha Ashtami — usually in May or June. It is the largest annual gathering of the Kashmiri Pandit community, and devotees offer kheer and milk at the sacred spring around which the temple is built.",
    whatHappens: [
      "Offerings of kheer and milk are made at the spring through the day.",
      "Devotees travel in from across the valley and from outside it, many returning to Kashmir specifically for the day.",
      "Chinar-shaded temple grounds fill from early morning; the crowd is largest around midday.",
      "Langars and community kitchens run around the temple for the duration.",
    ],
    attend: [
      {
        id: "getting-there",
        title: "Getting to Tulmulla",
        body: "Tulmulla is about 27 km from Srinagar towards Ganderbal — under an hour by cab in normal traffic, and a comfortable half-day trip. On mela day the last stretch is slow and parking sits well back from the temple, so allow more.",
      },
      {
        id: "who-can-attend",
        title: "Anyone may attend",
        body: "The mela is open to all visitors, not only to the community it belongs to. It is a religious gathering rather than a spectacle, so the right posture is that of a guest — watch, do not intrude, and follow what everyone around you is doing.",
      },
      {
        id: "etiquette",
        title: "Dress modestly, remove shoes, ask before photographing",
        body: "Cover shoulders and legs, cover your head inside the temple, and leave shoes where everyone else does. Photographing people at prayer without asking is the one thing that reliably causes offence.",
      },
      {
        id: "timing",
        title: "Go early in the day",
        body: "The grounds fill through the morning and peak around midday. Arriving early gets you the temple and the spring with room to stand, and gets you back to Srinagar before the return traffic.",
      },
    ],
    history: [
      {
        id: "the-spring",
        title: "The spring that changes colour",
        body: "The temple is built around a sacred spring dedicated to Ragnya Devi, and the tradition holds that the colour of its water carries meaning — a darkening read as a warning of hard times ahead. It is among the most revered sites in Kashmiri Pandit devotion, and the spring, not the building, is the shrine.",
      },
      {
        id: "the-gathering",
        title: "A return as much as a festival",
        body: "For a community largely displaced from the valley, the mela is an annual return as well as an observance — many attendees travel back to Kashmir specifically for this one day. That is what gives the gathering its particular weight, and it is worth understanding before you arrive.",
      },
    ],
    sartajTips: [
      "Go early. By late morning the approach road is parked solid and you walk the last stretch anyway — arriving at eight makes it a different day.",
      "Take the Ganderbal road and combine it with Manasbal Lake, twenty minutes further on. It is the quietest of the valley's big lakes and nobody plans it.",
      "This is a devotional gathering, not an event. Cameras down around the spring unless you have asked, and you will be treated as a guest throughout.",
    ],
    faqs: [
      {
        id: "kheer-bhawani-date",
        question: "When is the Kheer Bhawani Mela held?",
        answer:
          "On Jyeshtha Ashtami, which falls in May or June depending on the Hindu lunar calendar and therefore moves each year. It is a single day. We list the window rather than a date because the calendar date changes annually.",
      },
      {
        id: "kheer-bhawani-non-hindu",
        question: "Can non-Hindus visit the Kheer Bhawani temple?",
        answer:
          "Yes. The temple and the mela are open to any visitor. Dress modestly, cover your head inside, remove your shoes where others do, and ask before photographing people — the same etiquette that applies at any place of worship in the valley.",
      },
      {
        id: "kheer-bhawani-reach",
        question: "How do I get to Kheer Bhawani from Srinagar?",
        answer:
          "It is about 27 km to Tulmulla on the Ganderbal road — under an hour by cab in ordinary traffic and an easy half-day trip. On mela day itself the last few kilometres are congested and parking is well back from the temple, so leave earlier than you would otherwise.",
      },
    ],
  },

  "eid-and-navroz": {
    facts: [
      { id: "shops", label: "On the day", value: "Many shops and offices closed" },
      { id: "markets", label: "Before the day", value: "Markets exceptionally busy" },
      { id: "dress", label: "At the mosques", value: "Modest dress; heads covered" },
    ],
    intro:
      "Eid and Navroz are the valley's two biggest observances. Eid falls twice a year on the Islamic lunar calendar and shifts about eleven days earlier annually; Navroz, the Persian new year, falls around 20–21 March. Both are family occasions rather than public spectacles — which matters for a visitor mostly in what it does to the markets, the shops and the roads.",
    whatHappens: [
      "Dawn congregations at Hazratbal and the Jamia Masjid draw the largest gatherings in the valley.",
      "Markets in the days before are packed — Eid shopping is the busiest retail period of the Kashmiri year.",
      "Wazwan feasting happens in family homes rather than in public.",
      "Many shops, offices and some services close on the day itself.",
    ],
    attend: [
      {
        id: "plan-around-it",
        title: "Plan the itinerary around it, not out of it",
        body: "The practical effect on a visitor is closure: shops shut, some drivers are off, and Srinagar's usual rhythm pauses for a day. Keep a travel day or a Gulmarg or Pahalgam day for the occasion itself rather than a shopping or sightseeing day.",
      },
      {
        id: "mosques",
        title: "Visiting the mosques",
        body: "Hazratbal and the Jamia Masjid are both worth visiting on ordinary days and are extraordinarily crowded on Eid morning. If you go, go respectfully and stay outside the prayer area — dress modestly, cover your head, and do not photograph people at prayer.",
      },
      {
        id: "markets",
        title: "See the markets in the run-up",
        body: "The days before Eid are the most alive Srinagar's markets ever get — the old city, Lal Chowk and the bakeries especially. This is the part a visitor can genuinely take part in, and it is far more interesting than the day itself.",
      },
      {
        id: "food",
        title: "Ask, and you may be fed",
        body: "Wazwan on Eid happens in homes, not restaurants, and hospitality in Kashmir runs strong. Guests who show interest respectfully are quite often invited in — that is not something to expect, but it is worth being open to.",
      },
    ],
    history: [
      {
        id: "eid",
        title: "Two Eids, a lunar calendar",
        body: "Eid al-Fitr marks the end of Ramadan and Eid al-Adha follows roughly two months later. Both are set by the Islamic lunar calendar, which runs about eleven days shorter than the Gregorian year — which is why they move steadily earlier and why no fixed date can be published for them in advance.",
      },
      {
        id: "navroz",
        title: "Navroz in the valley",
        body: "Navroz, the Persian new year at the spring equinox, is observed in Kashmir with a particular character shaped by the valley's long Central Asian and Persian connections. It lands around 20–21 March, close to the start of the tulip window, and marks the turn of the season as much as the calendar.",
      },
    ],
    sartajTips: [
      "The two or three days before Eid are the best street photography in Kashmir all year. The old city bakeries at dawn, in particular, are something else.",
      "Do not schedule a shopping day or a full sightseeing day on Eid itself. Half of what you intend to visit will be shut and your driver may well be with family.",
      "Navroz falls right at the front of the tulip window. If your dates are flexible in March, the two together make one very good week.",
    ],
    faqs: [
      {
        id: "eid-dates",
        question: "When is Eid in Kashmir this year?",
        answer:
          "Eid follows the Islamic lunar calendar and is confirmed by moon sighting, so the date moves about eleven days earlier each year and is only fixed shortly beforehand. Navroz is stable, around 20–21 March. We do not print an estimated Eid date here for the same reason nobody local will give you one until the night before.",
      },
      {
        id: "eid-travel-impact",
        question: "Should I avoid travelling to Kashmir during Eid?",
        answer:
          "No — but plan around it. Expect many shops and offices shut on the day, busier roads and packed markets beforehand, and some drivers and guides taking the day off. It is a good day to be in Gulmarg or Pahalgam, or to travel between towns, rather than to shop in Srinagar.",
      },
      {
        id: "eid-visitor-welcome",
        question: "Can visitors take part in Eid celebrations?",
        answer:
          "Respectfully, yes. The mosques are visitable outside the prayer area with modest dress and covered heads, the markets beforehand are open to everyone, and Kashmiri hospitality being what it is, guests are quite often invited to eat. What you should not do is treat prayer as a photo opportunity.",
      },
    ],
  },

  "sufi-festivals": {
    facts: [
      { id: "dress", label: "Dress code", value: "Modest; heads covered at the shrine" },
      { id: "timing", label: "When it happens", value: "Often through the night" },
      { id: "shrines", label: "Main shrines", value: "Charar-e-Sharief · Hazratbal · Makhdoom Sahib" },
    ],
    intro:
      "Each of Kashmir's major shrines marks its saint's urs — the anniversary of their passing — with a gathering of devotional singing that often runs through the night. The dates follow the Islamic calendar and move each year, so there is an urs somewhere in the valley in most months. Visitors are welcome at all of them.",
    whatHappens: [
      "Night-long devotional singing at the shrine, building through the small hours.",
      "Sufiyana kalam performed on the santoor, saz-e-Kashmir and tumbaknari — among the valley's oldest surviving music.",
      "Large gatherings of devotees, with langars and community kitchens running alongside.",
      "The shrines themselves — Charar-e-Sharief's timber architecture especially — are the other half of the visit.",
    ],
    attend: [
      {
        id: "which-shrine",
        title: "Pick the shrine, then the date",
        body: "Charar-e-Sharief, about 30 km from Srinagar, honours Sheikh Noor-ud-din Noorani and is the most striking to visit. Hazratbal sits on Dal Lake in the city. Makhdoom Sahib is on the slope of Hari Parbat. Each has its own urs on its own date.",
      },
      {
        id: "dates",
        title: "Check the date locally, close to the time",
        body: "Urs dates run on the Islamic calendar and move about eleven days earlier each year. There is no reliable annual list published far ahead — asking locally a week or two out is genuinely the accurate method.",
      },
      {
        id: "etiquette",
        title: "Cover your head, dress modestly",
        body: "Heads covered, shoulders and legs covered, shoes off where everyone else leaves them. Men's and women's areas are usually separate. None of this is gatekeeping — visitors of any faith are welcome at all of these shrines.",
      },
      {
        id: "timing",
        title: "Go at night for the music",
        body: "The singing is an evening and night affair, and it deepens as the night goes on. A daytime visit gets you the shrine; a night visit gets you the reason the urs exists.",
      },
    ],
    history: [
      {
        id: "sufism-in-kashmir",
        title: "Why the valley is called Pir Vaer",
        body: "Kashmir has been shaped by Sufi and Rishi traditions for centuries, to the point of being known as Pir Vaer — the valley of saints. The shrines are not peripheral to Kashmiri Islam; the syncretic, devotional character they carry is central to how the valley practises it.",
      },
      {
        id: "sufiyana-kalam",
        title: "Sufiyana kalam",
        body: "The music performed at these gatherings is a classical tradition in its own right, carrying Persian and Central Asian lineage on instruments largely specific to Kashmir. It is played by a shrinking number of families, which makes an urs one of the few places it can still reliably be heard live.",
      },
    ],
    sartajTips: [
      "Charar-e-Sharief is the one to choose if you are only doing one. It is an easy day trip from Srinagar and the timber shrine is worth the drive on any date.",
      "Ask locally for the urs dates a week or two ahead rather than searching online. The lunar dates online are frequently wrong and everyone in the neighbourhood knows the right one.",
      "Stay past midnight if you can. The sufiyana singing at two in the morning is a different thing entirely from the same performance at nine.",
    ],
    faqs: [
      {
        id: "sufi-dates",
        question: "When are the Sufi urs festivals held in Kashmir?",
        answer:
          "Each shrine marks its own saint's urs on its own date in the Islamic calendar, so they fall through the year and move about eleven days earlier annually. There is no single festival date. Asking locally a week or two before you travel is the most reliable way to find the one falling during your visit.",
      },
      {
        id: "sufi-non-muslim",
        question: "Can non-Muslims attend a shrine urs?",
        answer:
          "Yes, at all of Kashmir's major shrines. Cover your head, dress modestly, remove your shoes where others do, and expect men's and women's areas to be separate. Visitors are common at these gatherings and are treated as guests.",
      },
      {
        id: "sufi-charar",
        question: "How do I get to Charar-e-Sharief from Srinagar?",
        answer:
          "It is about 30 km south-west of Srinagar, roughly an hour by cab, and an easy half-day trip that combines well with Yusmarg further on. The shrine is worth visiting on an ordinary day, not only during the urs.",
      },
    ],
  },
};

/** Detail payload for a slug, or undefined when the page is hub-only so far. */
export function getFestivalDetail(slug: string): FestivalDetail | undefined {
  return FESTIVAL_DETAILS[slug];
}
