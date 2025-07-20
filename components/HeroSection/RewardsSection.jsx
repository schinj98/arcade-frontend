import React, { useState } from 'react';
import { Trophy, Gift, Sparkles, ChevronRight, Info, X, ChevronDown, ChevronUp } from 'lucide-react';

export default function RewardsSection() {
  const [hoveredTier, setHoveredTier] = useState(null);
  const [selectedTier, setSelectedTier] = useState(null);
  const [expandedSwag, setExpandedSwag] = useState(null);

  const tierImages = {
    Novice: "/images/arcade-swags-images/Novice.png",
    Trooper: "/images/arcade-swags-images/Trooper.png",
    Ranger: "/images/arcade-swags-images/Ranger.png",
    Champion: "/images/arcade-swags-images/Champion.png",
    Legend: "/images/arcade-swags-images/Legend.png",
  };

  const tiers = [
    { name: 'Novice', points: 20, image: tierImages.Novice, color: 'from-green-400 to-emerald-500', bgColor: 'bg-emerald-50', borderColor: 'border-emerald-200' },
    { name: 'Trooper', points: 40, image: tierImages.Trooper, color: 'from-blue-400 to-indigo-500', bgColor: 'bg-blue-50', borderColor: 'border-blue-200' },
    { name: 'Ranger', points: 65, image: tierImages.Ranger, color: 'from-purple-400 to-pink-500', bgColor: 'bg-purple-50', borderColor: 'border-purple-200' },
    { name: 'Champion', points: 75, image: tierImages.Champion, color: 'from-orange-400 to-red-500', bgColor: 'bg-orange-50', borderColor: 'border-orange-200' },
    { name: 'Legend', points: 85, image: tierImages.Legend, color: 'from-yellow-400 to-amber-500', bgColor: 'bg-amber-50', borderColor: 'border-amber-200' },
  ];
  

  // Sample swag data for each tier
  const tierSwags = {
    Novice: [
      {
        id: 1,
        title: "Arcade Novice T-Shirt",
        image: "https://placehold.co/300x300?text=T-Shirt",
        description: "A comfortable cotton t-shirt with the Arcade Novice logo. Perfect for casual wear and showing off your first achievement in the Arcade program."
      },
      {
        id: 2,
        title: "Sticker Pack",
        image: "https://placehold.co/300x300?text=Stickers",
        description: "A collection of 10 unique Arcade-themed stickers featuring various tech icons and motivational quotes to decorate your laptop or workspace."
      },
      {
        id: 3,
        title: "Digital Badge",
        image: "https://placehold.co/300x300?text=Badge",
        description: "An exclusive digital badge that you can display on your GitHub profile, LinkedIn, or personal website to showcase your Novice tier achievement."
      }
    ],
    Trooper: [
      {
        id: 4,
        title: "Arcade Hoodie",
        image: "https://placehold.co/300x300?text=Hoodie",
        description: "A premium quality hoodie with embroidered Arcade Trooper logo. Made from soft fleece material, perfect for coding sessions in cool weather."
      },
      {
        id: 5,
        title: "Tech Sticker Bomb",
        image: "https://placehold.co/300x300?text=Tech+Stickers",
        description: "An expanded collection of 25 premium vinyl stickers featuring programming languages, frameworks, and Arcade-exclusive designs."
      },
      {
        id: 6,
        title: "Water Bottle",
        image: "https://placehold.co/300x300?text=Bottle",
        description: "A sleek insulated water bottle with Arcade Trooper branding. Keeps drinks cold for 24 hours or hot for 12 hours, perfect for long coding sessions."
      },
      {
        id: 7,
        title: "Laptop Sleeve",
        image: "https://placehold.co/300x300?text=Sleeve",
        description: "A protective neoprene laptop sleeve with the Arcade logo. Fits most 13-15 inch laptops and provides excellent protection for your tech gear."
      }
    ],
    Ranger: [
      {
        id: 8,
        title: "Arcade Backpack",
        image: "https://placehold.co/300x300?text=Backpack",
        description: "A durable canvas backpack with multiple compartments designed for developers. Features a padded laptop compartment and organized pockets for all your tech essentials."
      },
      {
        id: 9,
        title: "Wireless Charger",
        image: "https://placehold.co/300x300?text=Charger",
        description: "A sleek Qi-compatible wireless charging pad with Arcade Ranger branding. Supports fast charging for compatible devices up to 15W."
      },
      {
        id: 10,
        title: "Mechanical Keyboard",
        image: "https://placehold.co/300x300?text=Keyboard",
        description: "A compact 60% mechanical keyboard with custom Arcade keycaps. Features Cherry MX switches and RGB backlighting for the ultimate coding experience."
      },
      {
        id: 11,
        title: "Premium Notebook Set",
        image: "https://placehold.co/300x300?text=Notebook",
        description: "A set of three high-quality notebooks with dotted pages, perfect for sketching ideas, taking notes, or planning your next big project."
      },
      {
        id: 12,
        title: "Coffee Mug",
        image: "https://placehold.co/300x300?text=Mug",
        description: "A ceramic mug with heat-changing technology. The Arcade Ranger logo appears when hot liquid is added, making your morning coffee more exciting."
      }
    ],
    Champion: [
      {
        id: 13,
        title: "Gaming Chair",
        image: "https://placehold.co/300x300?text=Chair",
        description: "An ergonomic gaming chair with Arcade Champion branding. Features lumbar support, adjustable height, and premium leather upholstery for maximum comfort during long coding sessions."
      },
      {
        id: 14,
        title: "Monitor Stand",
        image: "https://placehold.co/300x300?text=Stand",
        description: "A wooden monitor stand with built-in USB hub and wireless charging pad. Elevates your monitor to the perfect height while organizing your desk setup."
      },
      {
        id: 15,
        title: "Arcade Jacket",
        image: "https://placehold.co/300x300?text=Jacket",
        description: "A stylish bomber jacket with embroidered Arcade Champion patches. Made from premium materials with a comfortable fit perfect for any occasion."
      },
      {
        id: 16,
        title: "Desk Organizer Set",
        image: "https://placehold.co/300x300?text=Organizer",
        description: "A complete desk organization system including pen holders, cable management, and storage compartments, all branded with the Arcade Champion logo."
      },
      {
        id: 17,
        title: "Bluetooth Speaker",
        image: "https://placehold.co/300x300?text=Speaker",
        description: "A portable Bluetooth speaker with exceptional sound quality. Features custom Arcade sound effects and 20-hour battery life for all-day listening."
      },
      {
        id: 18,
        title: "Smart Watch Band",
        image: "https://placehold.co/300x300?text=Watch+Band",
        description: "A premium silicone watch band compatible with most smartwatches. Features the Arcade Champion logo and comes in multiple color options."
      }
    ],
    Legend: [
      {
        id: 19,
        title: "Custom Arcade Setup",
        image: "https://placehold.co/300x300?text=Setup",
        description: "A complete custom desk setup including monitor, keyboard, mouse pad, and accessories, all branded with exclusive Arcade Legend designs and your name."
      },
      {
        id: 20,
        title: "Arcade Legend Trophy",
        image: "https://placehold.co/300x300?text=Trophy",
        description: "A premium crystal trophy engraved with your name and achievement date. A prestigious award recognizing your dedication to the Arcade program."
      },
      {
        id: 21,
        title: "Exclusive Merchandise Bundle",
        image: "https://placehold.co/300x300?text=Bundle",
        description: "An exclusive bundle containing limited edition items never available to other tiers, including rare collectibles and signed memorabilia from the Arcade team."
      },
      {
        id: 22,
        title: "VIP Conference Pass",
        image: "https://placehold.co/300x300?text=Pass",
        description: "An all-access pass to major tech conferences, including accommodation and travel expenses. Network with industry leaders and expand your knowledge."
      },
      {
        id: 23,
        title: "Custom Artwork",
        image: "https://placehold.co/300x300?text=Art",
        description: "A commissioned digital artwork created specifically for you by renowned tech artists, featuring your coding journey and achievements in the Arcade program."
      },
      {
        id: 24,
        title: "Legend Certificate",
        image: "https://placehold.co/300x300?text=Certificate",
        description: "A beautifully crafted certificate recognizing your Legend status, signed by the Arcade team and suitable for framing in your office or workspace."
      },
      {
        id: 25,
        title: "Arcade Mentor Session",
        image: "https://placehold.co/300x300?text=Mentorship",
        description: "A one-on-one mentorship session with senior developers from top tech companies, providing career guidance and technical insights to help advance your journey."
      }
    ]
  };

  const handleTierClick = (tier) => {
    setSelectedTier(tier);
    setExpandedSwag(null);
  };

  const closePopup = () => {
    setSelectedTier(null);
    setExpandedSwag(null);
  };

  const toggleSwagDescription = (swagId) => {
    setExpandedSwag(expandedSwag === swagId ? null : swagId);
  };

  return (
    <div className="min-h-screen rounded-xl bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="bg-blue-100 rounded-2xl shadow-sm border border-blue-200 p-8 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="p-3 bg-blue-500 rounded-xl text-white">
                  <Trophy size={24} />
                </div>
                <h1 className="text-3xl font-bold text-gray-900">Swag Rewards</h1>
              </div>
              <p className="text-gray-600">
                Earn points to unlock exclusive swag rewards from previous seasons
              </p>
              <div className="flex items-center gap-4 mt-4">
                <div className="flex items-center text-sm text-gray-500">
                  <Gift size={16} className="text-blue-400 mr-1" />
                  <span className="font-medium text-gray-900">5</span>
                  <span className="ml-1">reward tiers</span>
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <Sparkles size={16} className="text-amber-500 mr-1" />
                  <span className="font-medium text-gray-900">Season 1</span>
                  <span className="ml-1">collection</span>
                </div>
              </div>
            </div>

            {/* Season Badge */}
            <div className="bg-transparent px-6 py-4 rounded-xl border border-blue-300">
              <div className="flex items-center gap-3">
                <div className="text-2xl">🏆</div>
                <div>
                  <p className="text-sm text-gray-600">Previous Season</p>
                  <p className="font-semibold text-gray-900">Season 1 Rewards</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Rewards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-8">
          {tiers.map((tier, index) => (
            <div
              key={tier.name}
              className="bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-lg hover:shadow-gray-200/50 transition-all duration-300 overflow-hidden group cursor-pointer"
              onMouseEnter={() => setHoveredTier(tier.name)}
              onMouseLeave={() => setHoveredTier(null)}
              onClick={() => handleTierClick(tier)}
            >
              {/* Tier Image */}
              <div className={`relative h-48 ${tier.bgColor} flex items-center justify-center p-4 overflow-hidden`}>
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-white to-transparent rounded-full"></div>
                  <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-gradient-to-tr from-white to-transparent rounded-full"></div>
                </div>
                
                <img
                  src={tier.image}
                  alt={`${tier.name} Badge`}
                  className="relative z-10 max-h-full max-w-full object-contain group-hover:scale-110 transition-transform duration-300"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://placehold.co/160x160?text=Tier';
                  }}
                />
                
                {/* Points Badge */}
                <div className={`absolute top-3 right-3 px-3 py-1.5 text-xs font-medium rounded-lg ${tier.bgColor} ${tier.borderColor} border backdrop-blur-sm`}>
                  {tier.points} pts
                </div>
              </div>

              {/* Tier Content */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-semibold text-gray-900">{tier.name}</h3>
                  <ChevronRight 
                    size={20} 
                    className={`text-gray-400 transition-transform duration-200 ${
                      hoveredTier === tier.name ? 'translate-x-1' : ''
                    }`}
                  />
                </div>
                
                <p className="text-sm text-blue-600">
                  Tier {index + 1} Reward
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Season Notice */}
        <div className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-2xl border border-orange-200 p-8 shadow-sm">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
            <div className="p-3 bg-orange-100 rounded-xl text-orange-600">
              <Info size={24} />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Season 2 Coming Soon!</h3>
              <p className="text-gray-600">
                The prizes shown are from Season 1. New exclusive rewards for Season 2 are being prepared and will be announced soon.
              </p>
            </div>
            <button className="px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white rounded-xl font-medium transition-all duration-200 flex items-center gap-2 whitespace-nowrap">
              Get Notified
              <ChevronRight size={16} />
            </button>
          </div>
        </div>

        {/* Popup Modal */}
        {selectedTier && (
          <div className="fixed inset-0  backdrop-blur-xs bg-black/30 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
              {/* Popup Header */}
              <div className={`relative ${selectedTier.bgColor} p-2 px-4 border-b ${selectedTier.borderColor}`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <img
                      src={selectedTier.image}
                      alt={`${selectedTier.name} Badge`}
                      className="w-20 h-20 object-contain"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = 'https://placehold.co/64x64?text=Tier';
                      }}
                    />
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">{selectedTier.name} Tier Swags</h2>
                      <p className="text-gray-600">{selectedTier.points} points required • {tierSwags[selectedTier.name]?.length || 0} items included</p>
                    </div>
                  </div>
                  <button
                    onClick={closePopup}
                    className="p-2 cursor-pointer hover:bg-white  hover:bg-opacity-20 rounded-full transition-colors duration-200"
                  >
                    <X size={24} className="text-gray-600" />
                  </button>
                </div>
              </div>

              {/* Popup Content */}
              <div className="p-6 max-h-[calc(90vh-200px)] overflow-y-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {tierSwags[selectedTier.name]?.map((swag) => (
                    <div key={swag.id} className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                      <div className="flex flex-col gap-4">
                        <img
                          src={swag.image}
                          alt={swag.title}
                          className="w-full h-48 object-cover rounded-lg"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = 'https://placehold.co/300x300?text=Swag';
                          }}
                        />
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 mb-2">{swag.title}</h3>
                          
                          {/* Description Toggle */}
                          <div className="space-y-2">
                            {expandedSwag === swag.id && (
                              <p className="text-sm text-gray-600 leading-relaxed">
                                {swag.description}
                              </p>
                            )}
                            <button
                              onClick={() => toggleSwagDescription(swag.id)}
                              className="flex items-center gap-2 cursor-pointer text-blue-600 hover:text-blue-700 text-sm font-medium transition-colors duration-200"
                            >
                              {expandedSwag === swag.id ? (
                                <>
                                  <span>Read Less</span>
                                  <ChevronUp size={16} />
                                </>
                              ) : (
                                <>
                                  <span>Read More</span>
                                  <ChevronDown size={16} />
                                </>
                              )}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}