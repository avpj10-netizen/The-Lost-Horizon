import { PackingItem } from '../types';

export const DEFAULT_PACKING_ITEMS: PackingItem[] = [
  // Trekking & Cliffs
  {
    id: 'pack-shoes',
    label: 'Trail runners / hiking shoes with aggressive lugs (for laterite cliffs & boulders)',
    category: 'Trekking & Cliffs',
    targetCircuit: 'gokarna',
    checked: false,
    essential: true,
  },
  {
    id: 'pack-headlamp',
    label: 'Compact LED headlamp or torch (trail between Kudle & Om is pitch black after 7 PM)',
    category: 'Trekking & Cliffs',
    targetCircuit: 'gokarna',
    checked: false,
    essential: true,
  },
  {
    id: 'pack-daypack',
    label: 'Lightweight 15-20L foldable daypack with water bottle holster',
    category: 'Trekking & Cliffs',
    targetCircuit: 'all',
    checked: true,
    essential: true,
  },

  // Modest Temple Attire
  {
    id: 'pack-dhoti',
    label: 'White Dhoti / Veshti (mandatory for men entering Mahabaleshwar inner sanctum)',
    category: 'Modest Temple Attire',
    targetCircuit: 'gokarna',
    checked: false,
    essential: true,
  },
  {
    id: 'pack-shawl',
    label: 'Cotton shawl / dupatta to cover shoulders & knees at Talakadu Panchalinga',
    category: 'Modest Temple Attire',
    targetCircuit: 'talakadu',
    checked: true,
    essential: true,
  },
  {
    id: 'pack-socks',
    label: 'Thick cotton socks (temple stone pavements and sand pits get scorching by noon)',
    category: 'Modest Temple Attire',
    targetCircuit: 'all',
    checked: false,
    essential: true,
  },

  // Sun & Coastal Gear
  {
    id: 'pack-sunscreen',
    label: 'Reef-safe SPF 50+ mineral sunscreen & aloe vera gel',
    category: 'Sun & Coastal Gear',
    targetCircuit: 'gokarna',
    checked: true,
    essential: true,
  },
  {
    id: 'pack-sunglasses',
    label: 'UV400 polarized sunglasses (essential for ocean glare and white river sands)',
    category: 'Sun & Coastal Gear',
    targetCircuit: 'all',
    checked: false,
    essential: true,
  },
  {
    id: 'pack-quickdry',
    label: 'Microfiber quick-dry towel & swim shorts / modest swimsuit',
    category: 'Sun & Coastal Gear',
    targetCircuit: 'gokarna',
    checked: false,
    essential: true,
  },

  // River & Dune Protection
  {
    id: 'pack-drybag',
    label: 'Waterproof dry bag pouch (for phone & wallet during Kaveri coracle spins)',
    category: 'River & Dune Protection',
    targetCircuit: 'talakadu',
    checked: false,
    essential: true,
  },
  {
    id: 'pack-sandals',
    label: 'River sandals with heel strap (Crocs / Chacos) for walking in muddy Kaveri banks',
    category: 'River & Dune Protection',
    targetCircuit: 'talakadu',
    checked: true,
    essential: true,
  },
  {
    id: 'pack-gaiters',
    label: 'Bandana / buff to protect face from fine blowing sand near the dunes',
    category: 'River & Dune Protection',
    targetCircuit: 'talakadu',
    checked: false,
    essential: false,
  },

  // Cash, UPI & Essentials
  {
    id: 'pack-cash',
    label: 'Physical cash notes ₹3,000 to ₹5,000 (remote shacks & boatmen have spotty network)',
    category: 'Cash, UPI & Essentials',
    targetCircuit: 'all',
    checked: true,
    essential: true,
  },
  {
    id: 'pack-powerbank',
    label: '10,000+ mAh power bank (continuous GPS on trails drains battery quickly)',
    category: 'Cash, UPI & Essentials',
    targetCircuit: 'all',
    checked: false,
    essential: true,
  },
  {
    id: 'pack-electrolytes',
    label: 'Oral rehydration salts (ORS) & mosquito repellent roll-on',
    category: 'Cash, UPI & Essentials',
    targetCircuit: 'all',
    checked: false,
    essential: true,
  },

  // Eco & Leave No Trace
  {
    id: 'pack-bottle',
    label: 'Reusable insulated stainless steel bottle (refill at certified RO points)',
    category: 'Eco & Leave No Trace',
    targetCircuit: 'all',
    checked: true,
    essential: true,
  },
  {
    id: 'pack-trashbag',
    label: 'Trash seal pouch to carry back plastic wrappers from remote Paradise Beach',
    category: 'Eco & Leave No Trace',
    targetCircuit: 'all',
    checked: false,
    essential: true,
  },
];
