import { ThresholdTable } from '../src/rollFromTable'
import { Alchemist } from './_common'
import { NPC } from '../npc-generation/_common'
import { random } from '../src/random'

interface AlchemistData {
  rollData: {
    wealth: ThresholdTable
    size: ThresholdTable
    cleanliness: ThresholdTable
    expertise: ThresholdTable
  }
  get: {
    customers: Customer[]
    lookAround(alchemist: Alchemist): LookAround[]
    priceTalk(alchemist: Alchemist): PriceTalk[]
  }
  name: {
    noun: string[]
    adjective: string[]
    rider: string[]
  }
  ingredients: string[]
}

interface Customer {
  relationshipDescription: string
  relationships: {
    building?: {
      relationship: string
      reciprocalRelationship?: string
    }
    associatedNPC?: {
      relationship: string
      reciprocalRelationship: string
    }
  }
  base?: Base
  description(alchemist: Alchemist, npc: NPC): string
}

interface Base {
  weight?: string
  note?: string
  background?: string
  profession?: string
}

interface LookAround {
  cleanliness: number
  wealth: number
  note: string
}

interface PriceTalk {
  priceModifier: number
  wealth: number
  priceTalk: string
}

export const alchemistData: AlchemistData = {
  rollData: {
    wealth: [
      [95, 'kingly'],
      [80, 'aristocratic'],
      [70, 'wealthy'],
      [60, 'comfortable'],
      [50, 'modest'],
      [25, 'poor'],
      [15, 'squalid'],
      [0, 'destitute']
    ],
    size: [
      [95, 'cavernous'],
      [80, 'huge'],
      [70, 'quite large'],
      [60, 'large'],
      [50, 'spacious'],
      [40, 'average sized'],
      [30, 'somewhat cramped'],
      [20, 'small'],
      [10, 'tiny'],
      [0, 'extremely cramped']
    ],
    cleanliness: [
      [80, 'fastidious'],
      [70, 'very tidy'],
      [60, 'tidy'],
      [50, 'reasonably tidy'],
      [40, 'somewhat messy'],
      [30, 'rather messy'],
      [20, 'very messy'],
      [10, 'extremely messy'],
      [0, 'dangerously messy']
    ],
    expertise: [
      [80, 'masterful'],
      [70, 'exceptional'],
      [60, 'superior quality'],
      [50, 'finely crafted'],
      [40, 'well crafted'],
      [30, 'sloppily made'],
      [20, 'somewhat amateur'],
      [10, 'amateur'],
      [0, 'blatantly amateur']
    ]
  },
  get: {
    customers: [
      {
        relationshipDescription: 'customer',
        relationships: {
          building: {
            relationship: 'customer'
          },
          associatedNPC: {
            relationship: 'client',
            reciprocalRelationship: 'alchemist'
          }
        },
        description (building, npc) { return `${npc.firstName} purchases ${random(['herbs', 'some rare herbs', 'some reagents', 'salt', 'some spices', 'spices typically used in alchemy'])} from ${building.name} for cooking.` }
      },
      {
        relationshipDescription: 'weight-loss customer',
        relationships: {
          building: {
            relationship: 'weight-loss customer'
          },
          associatedNPC: {
            relationship: 'client',
            reciprocalRelationship: 'supplier of weight-loss medication'
          }
        },
        base: {
          weight: 'fat',
          note: '$currentNPC.firstName is trying to lose weight.'
        },
        description (building, npc) { return `${npc.firstName} purchases ${random(['herbs', 'some rare herbs', 'some reagents', 'salt', 'some spices', 'literal snake oil'])} from ${building.name} for weight loss purposes. It ${random(['doesn\'t seem to be working.', 'seems to be working?', 'is too early to tell if it is working or not.', 'is very clearly a scam.'])}` }
      },
      {
        relationshipDescription: 'discrete customer',
        relationships: {
          building: {
            relationship: 'discrete customer'
          },
          associatedNPC: {
            relationship: 'client',
            reciprocalRelationship: 'alchemist'
          }
        },
        description (building, npc) { return `${npc.firstName} secretly purchases ${random(['poison', 'some rare herbs used for poison', 'some reagents', 'unnamed powders', 'some things that could be considered dangerous', 'strange potions', 'potions', 'unnamed potions', 'glassware', 'glassware and alchemical reagents'])} from ${building.name}.` }
      },
      {
        relationshipDescription: 'lovestruck customer',
        relationships: {
          building: {
            relationship: 'lovestruck customer'
          },
          associatedNPC: {
            relationship: 'client',
            reciprocalRelationship: 'love potion supplier'
          }
        },
        description (building, npc) { return `${npc.firstName} secretly purchases ${random(['love potions', 'potions purported to beguile the imbiber', 'potions meant to make the drinker fall in love'])} from ${building.name}.` }
      },
      {
        relationshipDescription: 'detractor',
        relationships: {
          building: {
            relationship: 'detractor',
            reciprocalRelationship: 'target of ire'
          },
          associatedNPC: {
            relationship: 'target of ire',
            reciprocalRelationship: 'detractor'
          }
        },
        base: {
          background: 'acolyte'
        },
        description (building, npc) { return `${npc.firstName} is an outspoken detractor of ${building.name}, believing alchemy to be an abomination.` }
      },
      {
        relationshipDescription: 'client',
        relationships: {
          building: {
            relationship: 'client',
            reciprocalRelationship: 'supplier'
          },
          associatedNPC: {
            relationship: 'alchemist',
            reciprocalRelationship: 'client'
          }
        },
        base: {
          profession: 'merchant'
        },
        description (building, npc) { return `${npc.firstName} supplies ${random(['herbs', 'some rare herbs', 'some reagents', random(alchemistData.ingredients)])} to ${building.name}.` }
      }
    ],
    lookAround: alchemist => [
      {
        cleanliness: 80,
        wealth: 10,
        note: `Looking around, ${alchemist.name} is an extremely clean shop. Sheafs of paper are stacked in piles neatly, with recipes being used currently carefully placed on stands. The typical chemical burns that stain most alchemist shops are nowhere to be found.`
      },
      {
        cleanliness: 70,
        wealth: 10,
        note: `Looking around, ${alchemist.name} is a very clean shop (as far as alchemist shops go). There are sheafs of paper, presumably recipes, neatly stacked on benches away from the ominous bubbling of pots that are brewing new concoctions.`
      },
      {
        cleanliness: 60,
        wealth: 10,
        note: `Looking around, ${alchemist.name} is pretty clean, by alchemical standards. There's a decent sense of order, and sheafs of paper are for the most part kept away from the pots and jugs of strangely coloured brews that stand in a line on the desk.`
      },
      {
        cleanliness: 50,
        wealth: 10,
        note: `Looking around, ${alchemist.name} is as clean as you'd expect for a shop that deals with magical, often volatile chemicals. There's some sense of order, with papers (presumably recipes) kept in stacks, some of them concerningly close to the pots and jugs of strangely coloured brews that clutter the desk.`
      },
      {
        cleanliness: 40,
        wealth: 10,
        note: `Looking around, ${alchemist.name} is somewhat messy; a dangerous trait for a shop that deals with magical, often volatile chemicals. There's a vague sense of order, although the papers that are strewn around the room do little to help. There are pots and pans of mixtures yet to be decanted crowding the desk.`
      },
      {
        cleanliness: 30,
        wealth: 10,
        note: `Looking around, ${alchemist.name} is rather messy; a dangerous trait for a shop that deals with magical, often volatile chemicals. There's little sense of order, and you accidentally step on a recipe as you make your way through the shop. There are pots and pans of mixtures yet to be decanted crowding the desk, leaving the currently brewing potions to take residence on the floor, where they could be easily knocked over.`
      },
      {
        cleanliness: 20,
        wealth: 10,
        note: `Looking around, ${alchemist.name} is extremely messy; a very dangerous trait for a shop that deals with magical, often volatile chemicals. There's no sense of order, and you accidentally step in something that fizzled rather disconcertingly as you make your way through the shop. There are pots and pans of mixtures yet to be cleaned crowding the desk, leaving the currently brewing potions to take residence on the floor, where they could be easily knocked over.`
      },
      {
        cleanliness: 10,
        wealth: 10,
        note: `Looking around, ${alchemist.name} must have had an explosion the day before; there is no other possible reason that a shop that deals with magical, often volatile chemicals would be so cluttered, crowded, and blatantly a danger to itself and the half-mile radius surrounding it. There are pots and pans of mixtures that have already spilt over crowding the desk, with potions that are currently brewing strewn around the floor. There's little hope to walk through the shop without putting your boot in something that you probably would prefer not to put it in. Just as you try and hesitate, you hear the distinct sound of 'no, please don't go!' come from the floorboards, which at first seemed to be sticky, but on closer inspection, was more... 'grabby'.`
      }
    ],
    priceTalk: alchemist => [
      {
        priceModifier: 5,
        wealth: 80,
        priceTalk: 'Be warned, these prices might be... out of your range'
      },
      {
        priceModifier: 5,
        wealth: 50,
        priceTalk: "Fair warning; the prices ain't what they used to be, by a long shot."
      },
      {
        priceModifier: 5,
        wealth: 20,
        priceTalk: "I'm afraid that times are tough, there's a bit of a surcharge on the fun stuff."
      },
      {
        priceModifier: 2,
        wealth: 80,
        priceTalk: 'Fair warning, premium products come with a premium price.'
      },
      {
        priceModifier: 2,
        wealth: 50,
        priceTalk: "Fair warning; the prices ain't what they used to be."
      },
      {
        priceModifier: 2,
        wealth: 20,
        priceTalk: "Things might be a wee bit more expensive than you're used to, but that's the cost of doing business at the moment."
      },
      {
        priceModifier: -2,
        wealth: 80,
        priceTalk: 'These are priced to move, so I can make some space and get some new stock in.'
      },
      {
        priceModifier: -2,
        wealth: 50,
        priceTalk: 'Priced to move!'
      },
      {
        priceModifier: -2,
        wealth: 20,
        priceTalk: 'Priced to sell, so I can afford some new stock!'
      },
      {
        priceModifier: -4,
        wealth: 80,
        priceTalk: "Everything must go! I'm getting in entirely new, custom stock in a couple day's time, and need the space clear."
      },
      {
        priceModifier: -4,
        wealth: 50,
        priceTalk: "I've got a massive sale going on at the moment!"
      },
      {
        priceModifier: -4,
        wealth: 20,
        priceTalk: `Everything must go- can't afford to keep ${alchemist.name} open much longer, so I'm getting rid of the final stock.`
      }
    ]
  },
  name: {
    noun: ['Potion', 'Liquid', 'Fumes', 'Bottle', 'Vial', 'Firewater', 'Mortar and Pestle', 'Lab', 'Laboratory', 'Chemist', 'Alchemist', 'Brewer', 'Lotion', 'Wishes'],
    adjective: ['Bubbling', 'Spicy', 'Soggy', 'Fizzy', 'Liquid', 'Fluorescent', 'Clear', 'Alcoholic', 'Abyssal', 'Angelic', 'Elven', 'Measured', 'Marked', 'Glass', 'Glass', 'Copper', 'Corked', 'Burning', 'Red', 'Blue', 'Green', 'Gold', 'Yellow', 'Vile', 'Genuine', 'Original'],
    rider: ['Chemist', 'Alchemist', 'Potion Shop', 'Potionery', 'Ointmentary', 'Juice Bar', 'Lab', 'Laboratory', 'Secret Lair']
  },
  ingredients: ['bloodgrass', 'chromus slime', 'ephedra', 'emetic wax', 'fennel silk', 'gengko bush', 'hyacinth nectar', 'lavender sprigs', 'mandrake root', 'wild sageroot', 'arctic creeper', 'amanita cap', 'basilisk breath', 'cactus juice', 'drakus flower', 'harrada leaf', 'quicksilver lichen', 'radiant synthseed', 'spineflower berries', 'wyrmtongue petals', 'arrow root', 'blue toadshade', 'cosmos glond', "Devil's bloodleaf", "fiend's ivy", 'hydrathistle', 'ironwood heart', 'luminous cap dust', 'mortflesh powder', 'nightshade berries', 'primordial balm', 'rock vine', 'scilia beans', 'silver hibiscus', 'tail leaf', 'verdant nettle', 'voidroot', 'wispstalks', 'wrackwort bulbs']
}
