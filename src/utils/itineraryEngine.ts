import { GeneratedItinerary, CircuitType, TravelPace, TravelGroup, DayPlan } from '../types';

export interface ItineraryParams {
  circuit: CircuitType;
  durationDays: number;
  pace: TravelPace;
  group: TravelGroup;
  originCity: string;
  arrivalSlot: string;
  startDate?: string;
}

export function generateBespokeItinerary(params: ItineraryParams): GeneratedItinerary {
  const { circuit, durationDays, pace, group, originCity, arrivalSlot } = params;
  const days: DayPlan[] = [];

  const isCombined = circuit === 'combined' || circuit === 'all';
  const isTalakaduOnly = circuit === 'talakadu';

  for (let d = 1; d <= durationDays; d++) {
    // Determine which circuit segment this day belongs to
    let currentDayCircuit: 'gokarna' | 'talakadu' = 'gokarna';
    if (isTalakaduOnly) {
      currentDayCircuit = 'talakadu';
    } else if (isCombined) {
      // If 4-5 days combined: first 2-3 days Gokarna, then scenic transit to Talakadu/Mysuru, or vice versa
      currentDayCircuit = d <= Math.ceil(durationDays / 2) ? 'gokarna' : 'talakadu';
    }

    if (currentDayCircuit === 'gokarna') {
      if (d === 1) {
        days.push({
          dayNumber: d,
          themeTitle: 'The Holy Inlet & Sacred Headlands',
          circuit: 'gokarna',
          summary: `Arrival into coastal Uttara Kannada via ${arrivalSlot} from ${originCity}. Acclimate with temple darshan and an iconic sunset on Om Beach.`,
          dayBudgetEstimateInr: group === 'solo' ? 2200 : 3800,
          slots: [
            {
              timeSlot: 'Morning (06:00 - 10:00)',
              title: 'Arrival & Sacred Koti Teertha Cleansing',
              locationName: 'Koti Teertha & Mahabaleshwar Temple',
              circuit: 'gokarna',
              activity:
                'Check in at your stay. Walk bare-foot along Koti Teertha freshwater sacred tank where temple pilgrims and sadhus gather at dawn. Perform Atmalinga darshan at the 4th-century Mahabaleshwar temple.',
              insiderTip: 'Men must wear dhoti/veshti (no shirts) to touch the Atmalinga pit; arrive before 10:30 AM before darshan closes for afternoon pooja.',
              transportInfo: 'Walking distance or 5-min auto-rickshaw from Gokarna main town.',
              estCostInr: 350,
              highlightTag: 'Spiritual Core',
            },
            {
              timeSlot: 'Midday & Afternoon (11:00 - 15:30)',
              title: 'Fresh Catch & Chilled Cafe Respite at Kudle',
              locationName: 'Kudle Beach',
              circuit: 'gokarna',
              activity:
                'Head down the cliff steps to Kudle Beach. Indulge in authentic Konkani fish thali or avocado toast with iced cold brews under bamboo shack canopies.',
              insiderTip: 'Little Paradise Cafe and Ganga Cafe offer the best shade and sea breeze during high noon heat.',
              transportInfo: '10 min auto or scenic 15-min cliff walk from town.',
              estCostInr: 650,
              highlightTag: 'Coastal Gastronomy',
            },
            {
              timeSlot: 'Golden Hour & Sunset (16:00 - 18:45)',
              title: 'The Sacred Om Silhouette & Cliff Trail Walk',
              locationName: 'Om Beach',
              circuit: 'gokarna',
              activity:
                'Traverse to Om Beach, naturally sculpted like the sacred Devanagari ॐ symbol. Climb the black rock promontory splitting the two coves for 360° Arabian Sea views.',
              insiderTip: 'Namaste Cafe rocks are prime sunset perches; watch local fishing dhows return against the fiery sky.',
              transportInfo: 'Auto-rickshaw ₹150 or 25-min cliff trek from Kudle.',
              estCostInr: 300,
              highlightTag: 'Sunset Icon',
            },
            {
              timeSlot: 'Evening Starlight (19:30 - 22:00)',
              title: 'Bioluminescent Shoreline Stroll & Woodfire Feast',
              locationName: 'Om Beach Headland',
              circuit: 'gokarna',
              activity:
                'Dine on fresh grilled sea bass and lemon mint crush. On moonless nights, stroll barefoot along the receding tide line to spot microscopic neon-blue bioluminescent phytoplankton.',
              insiderTip: 'Avoid flashlights directly on the water; let your night vision adapt to catch glowing footprints.',
              transportInfo: 'Footpath back to beach cottage.',
              estCostInr: 800,
              highlightTag: 'Nocturnal Wonder',
            },
          ],
        });
      } else if (d === 2) {
        days.push({
          dayNumber: d,
          themeTitle: 'The 5-Beach Cliff Ridge Trek & Hidden Coves',
          circuit: 'gokarna',
          summary:
            pace === 'adventure'
              ? 'Rigorous cliff-hopping trail across Half Moon and Paradise Beach with boulder scrambling and wild ocean dips.'
              : 'Gentle boat cruise hopping untouched coves, secluded hammocks, and coconut water pitstops.',
          dayBudgetEstimateInr: group === 'solo' ? 2400 : 4200,
          slots: [
            {
              timeSlot: 'Morning (06:00 - 10:00)',
              title: 'Cliff-Edge Trek to Half Moon & Paradise Beach',
              locationName: 'Half Moon & Paradise Beach',
              circuit: 'gokarna',
              activity:
                'Hike the rugged laterite stone trail skirting steep cliffs. Reach Half Moon Beach tucked in a crescent cove, then press forward through pine groves to Paradise Beach.',
              insiderTip: 'Carry 2L electrolyte water; there are zero commercial power lines or ATMs at Paradise Beach.',
              transportInfo: 'Trailhead starts at Om Beach southern end.',
              estCostInr: 200,
              highlightTag: 'Wild Coast Trail',
            },
            {
              timeSlot: 'Midday & Afternoon (11:00 - 15:30)',
              title: 'Fisherman Coracle & Boat Ride Back to Kudle',
              locationName: 'Paradise Beach Cove',
              circuit: 'gokarna',
              activity:
                'Swim in tranquil turquoise waters shielded by natural granite breakwaters. Board a local wooden boat skipping back past dolphin feeding pods.',
              insiderTip: 'Negotiate the boat group rate (approx ₹400/person return to Om or Kudle).',
              transportInfo: 'Wooden longboat over gentle swells.',
              estCostInr: 600,
              highlightTag: 'Ocean Safari',
            },
            {
              timeSlot: 'Golden Hour & Sunset (16:00 - 18:45)',
              title: 'Mirjan Fort Moat & Laterite Rampart Exploration',
              locationName: 'Mirjan Fort',
              circuit: 'gokarna',
              activity:
                'Take a short drive to the 16th-century pepper queen Rani Chennabhairadevi fortress. Marvel at emerald moss clinging to double-walled laterite watchtowers.',
              insiderTip: 'Climb the southwest bastion for a panoramic perspective over the Aghanashini river estuary.',
              transportInfo: '22 km inland drive (35 mins by hired cab/scooter).',
              estCostInr: 450,
              highlightTag: 'Heritage Fortress',
            },
            {
              timeSlot: 'Evening Starlight (19:30 - 22:00)',
              title: 'Town Bazaar Antiques & Vedic Sitar Recital',
              locationName: 'Gokarna Car Street',
              circuit: 'gokarna',
              activity:
                'Explore Car Street illuminated by brass oil lamps. Browse hand-carved sandalwood figurines, pure sea salt, and listen to evening temple bells.',
              insiderTip: 'Sample hot Mangalore buns and filter kaapi at Prema Restaurant.',
              transportInfo: 'Short walk in town center.',
              estCostInr: 300,
              highlightTag: 'Cultural Immersion',
            },
          ],
        });
      } else {
        days.push({
          dayNumber: d,
          themeTitle: 'Monolithic Yana Spires & Murudeshwara Horizon',
          circuit: 'gokarna',
          summary: 'Excursion into the Sahyadri rainforest to climb the towering karst spires of Yana and the coastal colossus of Murudeshwara.',
          dayBudgetEstimateInr: group === 'solo' ? 2900 : 4900,
          slots: [
            {
              timeSlot: 'Morning (06:00 - 10:00)',
              title: 'Yana Karst Limestone Monoliths Expedition',
              locationName: 'Yana Limestone Caves',
              circuit: 'gokarna',
              activity:
                'Trek through moist evergreen canopy to Bhairaveshwara Shikhara (120m) and Mohini Shikhara. Walk through the natural subterranean crevice where water drips year-round.',
              insiderTip: 'Beware of wild monkeys; keep loose snacks stowed inside your daypack.',
              transportInfo: '48 km inland drive towards Sirsi (approx 1 hr 15 mins).',
              estCostInr: 500,
              highlightTag: 'Geological Wonder',
            },
            {
              timeSlot: 'Midday & Afternoon (11:00 - 15:30)',
              title: 'Traditional Uttara Kannada Banana-Leaf Feast',
              locationName: 'Kumta / Bhatkal Highway Heritage Meals',
              circuit: 'gokarna',
              activity:
                'Savor Tambli (herbal cooling buttermilk), raw jackfruit curry (Gujjepal), and freshly pressed sugarcane juice.',
              insiderTip: 'Ask for local kokum sharbat for natural heat mitigation.',
              transportInfo: 'On the coastal NH-66 return route.',
              estCostInr: 400,
              highlightTag: 'Local Palate',
            },
            {
              timeSlot: 'Golden Hour & Sunset (16:00 - 18:45)',
              title: 'Murudeshwara Peninsula & Raja Gopura Ascent',
              locationName: 'Murudeshwara Temple',
              circuit: 'gokarna',
              activity:
                'Stand beneath the world’s second tallest Shiva colossus (123 ft) surrounded by the sea on three sides. Ride the lift up the 20-story Raja Gopura for an aerial seascape.',
              insiderTip: 'The 18th floor observation deck elevator queue moves fastest around 16:30.',
              transportInfo: '55 km south of Gokarna along the scenic coast.',
              estCostInr: 450,
              highlightTag: 'Seaside Megalith',
            },
            {
              timeSlot: 'Evening Starlight (19:30 - 22:00)',
              title: 'Cliffside Return & Acoustic Campfire Reflection',
              locationName: 'Gokarna Cliff Overlook',
              circuit: 'gokarna',
              activity: 'Gather by an eco-resort terrace listening to crashing waves and reviewing camera captures of the day.',
              insiderTip: 'Pack your light fleece as ocean night winds become brisk after 9 PM.',
              transportInfo: 'Return cab to stay.',
              estCostInr: 500,
              highlightTag: 'Restful Twilight',
            },
          ],
        });
      }
    } else {
      // Talakadu & Southern Kaveri Circuit
      if (d === 1 || (isCombined && d === Math.ceil(durationDays / 2) + 1)) {
        days.push({
          dayNumber: d,
          themeTitle: 'The Sand-Buried Sanctums of Talakadu',
          circuit: 'talakadu',
          summary: `Transition into the fertile Kaveri river basin. Discover the mysterious dunes submerging 30+ temples and the mythical curse of Alamelamma.`,
          dayBudgetEstimateInr: group === 'solo' ? 2100 : 3600,
          slots: [
            {
              timeSlot: 'Morning (06:00 - 10:00)',
              title: 'Panchalinga Temple Pilgrimage: Vaidyanatheshwara & Pathaleshwara',
              locationName: 'Panchalinga Temples of Talakadu',
              circuit: 'talakadu',
              activity:
                'Walk across wooden deck ramps laid over golden river sand dunes. Descend into the excavated pit of Pathaleshwara where the Linga changes color through dawn, midday, and twilight.',
              insiderTip: 'Visit before 10 AM before the sun heats up the sand beneath your feet.',
              transportInfo: '45 km from Mysuru or 130 km from Bengaluru via Malavalli.',
              estCostInr: 250,
              highlightTag: 'Archaeological Enigma',
            },
            {
              timeSlot: 'Midday & Afternoon (11:00 - 15:30)',
              title: 'Kaveri River Coracle Ride & Fresh Sandbank Fish',
              locationName: 'Kaveri River Banks & Coracle Launch',
              circuit: 'talakadu',
              activity:
                'Board an authentic circular wicker and water-tight buffalo-hide coracle. Gently glide through Kaveri tributaries while the boatman spins the craft amidst gentle ripples.',
              insiderTip: 'Life jackets are mandatory; negotiate 30-minute private ride with the licensed boatmen guild.',
              transportInfo: 'Directly adjoining the Talakadu temple entrance perimeter.',
              estCostInr: 600,
              highlightTag: 'River Odyssey',
            },
            {
              timeSlot: 'Golden Hour & Sunset (16:00 - 18:45)',
              title: 'Keerthinarayana Hoysala Sand Excavation',
              locationName: 'Keerthinarayana Temple',
              circuit: 'talakadu',
              activity:
                'Stand before the 9-foot stone Vishnu statue commissioned by Hoysala King Vishnuvardhana in 1117 AD, freshly unearthed from centuries of sand entrapment.',
              insiderTip: 'Examine the soapstone lathe-turned pillars and exquisite ceiling rosette carvings.',
              transportInfo: 'Short 8-min walk through the sand trail.',
              estCostInr: 200,
              highlightTag: 'Hoysala Masterwork',
            },
            {
              timeSlot: 'Evening Starlight (19:30 - 22:00)',
              title: 'Riverside Retreat Dining & The Legend of Alamelamma',
              locationName: 'Kaveri Riverside Jaladhama / Camp',
              circuit: 'talakadu',
              activity:
                'Listen to the local lore of Rani Alamelamma’s 1610 AD curse: "May Talakadu turn into sand, May Malangi turn into a whirlpool, May the Mysore Rajas remain heirless!"',
              insiderTip: 'Taste traditional ragi mudde with spicy nati koli saaru or bisi bele bath.',
              transportInfo: 'Return to heritage guesthouse or resort.',
              estCostInr: 750,
              highlightTag: 'Folklore & Dining',
            },
          ],
        });
      } else {
        days.push({
          dayNumber: d,
          themeTitle: 'The Roar of Shivanasamudra & Somanathapura Precision',
          circuit: 'talakadu',
          summary: 'Witness the twin cascading torrents of Gaganachukki & Bharachukki, followed by the star-shaped perfection of Hoysala architecture.',
          dayBudgetEstimateInr: group === 'solo' ? 2600 : 4400,
          slots: [
            {
              timeSlot: 'Morning (06:00 - 10:00)',
              title: 'Twin Falls of Shivanasamudra: Gaganachukki & Bharachukki',
              locationName: 'Shivanasamudra Waterfalls',
              circuit: 'talakadu',
              activity:
                'Gaze across the gorge at Gaganachukki plunging 98 meters into rocky chasms. Continue to Bharachukki for mist spray and panoramic river views.',
              insiderTip: 'The Dargah viewpoint provides the dramatic head-on vantage for Gaganachukki without obstruction.',
              transportInfo: '32 km drive from Talakadu through sugarcane country.',
              estCostInr: 350,
              highlightTag: 'Hydro Cascade',
            },
            {
              timeSlot: 'Midday & Afternoon (11:00 - 15:30)',
              title: 'Mysuru Filter Coffee & Mysore Pak Culinary Stop',
              locationName: 'Malavalli / T. Narasipura Heritage Stop',
              circuit: 'talakadu',
              activity:
                'Recharge with crisp benne masala dosa, steaming tumbler kaapi, and ghee-dripping warm Mysore Pak at historic highway eateries.',
              insiderTip: 'Ask for freshly made ghee Mysore Pak rather than packed factory boxes.',
              transportInfo: 'Scenic state highway route.',
              estCostInr: 300,
              highlightTag: 'Culinary Heritage',
            },
            {
              timeSlot: 'Golden Hour & Sunset (16:00 - 18:45)',
              title: 'Somanathapura Keshava Temple (UNESCO Heritage)',
              locationName: 'Somanathapura Chennakeshava Temple',
              circuit: 'talakadu',
              activity:
                'Inspect the tripartite stellate (16-point star) temple platform. Every square centimeter is chiselled with caparisoned war elephants, charging cavalry, mythological epics, and celestial maidens.',
              insiderTip: 'Look for the tiny signatures of master sculptors like Mallitamma engraved into frieze bases.',
              transportInfo: '28 km drive from Shivanasamudra.',
              estCostInr: 400,
              highlightTag: 'Architectural Apex',
            },
            {
              timeSlot: 'Evening Starlight (19:30 - 22:00)',
              title: 'Kaveri Sangama Reflection & Return Journey Preparation',
              locationName: 'T. Narasipura Triveni Sangama',
              circuit: 'talakadu',
              activity:
                'Stand at the confluence where Kaveri, Kapila, and the mythical subterranean Spatika rivers unite under the stars before beginning your homeward departure.',
              insiderTip: 'Light an earthen ghee lamp on the river stone ghats.',
              transportInfo: 'Connecting highway to Bengaluru or Mysuru.',
              estCostInr: 300,
              highlightTag: 'Sacred Confluence',
            },
          ],
        });
      }
    }
  }

  const totalEstBudgetInr = days.reduce((sum, day) => sum + day.dayBudgetEstimateInr, 0);

  return {
    id: `lh-itin-${Date.now()}`,
    title:
      circuit === 'gokarna'
        ? `Coastal Spires & Shiva Coves (${durationDays} Days)`
        : circuit === 'talakadu'
        ? `Sand Dune Sanctums & Hoysala Chronicles (${durationDays} Days)`
        : `The Grand Karnataka Dual Circuit (${durationDays} Days)`,
    circuit,
    durationDays,
    pace,
    group,
    originCity,
    arrivalSlot,
    days,
    totalEstBudgetInr,
    packingKeyNotes: [
      'Grip footwear for Gokarna granite cliff trails and Talakadu hot river sand',
      'Modest temple dress code (dhoti/veshti for men at Mahabaleshwar sanctum)',
      'Dry bag / water pouch for Kaveri coracle excursions & beach longboats',
      'UPI active + ₹3,000 physical cash (ATMs in Gokarna remote beaches can run dry)',
    ],
    recommendedSeason: 'October through March (pleasant breezes, clear water, ideal river flow)',
    createdAt: new Date().toISOString(),
  };
}
