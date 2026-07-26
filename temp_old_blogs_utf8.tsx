"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

const BLOG_CATEGORIES = [
  "All Articles",
  "Festivals",
  "Prasadam & Seva",
  "Vedic Wisdom",
  "Youth & Life Skills"
];

const ALL_BLOGS = [
  {
    id: 1,
    title: "Kartik Deepotsav in Braj – The Divine Festival of Lights",
    category: "Festivals",
    readTime: "5 min read",
    date: "October 18, 2026",
    description: "Deepotsav celebrates the sacred month of Kartik. Throughout Braj, devotees offer ghee lamps to Lord Krishna and Srimati Radharani, filling temples with radiant spiritual devotion.",
    image: "/deepostav.webp",
    fullContent: `KARTIK DEEPOTSAV IN BRAJ: THE DIVINE FESTIVAL OF LIGHTS

Introduction to the Holy Month of Kartik
Kartik Deepotsav is one of the most sacred, soul-stirring, and joyful celebrations observed across the Vedic world during the holy month of Kartik, also known as Damodara Month (spanning October and November). Revered in ancient scriptures as the most auspicious period of the year, this sacred month is supremely dear to Lord Sri Krishna and Srimati Radharani. Throughout the holy land of Braj Dham, Mathura, Vrindavan, and temples across the world, thousands of devotees gather every single evening to offer burning ghee lamps (Deepdaan), filling sanctuaries with warm glowing light, divine music, and unconditional spiritual love.

The Sacred Significance of Kartik Month
According to timeless Vedic scriptures such as the Padma Purana and Skanda Purana, any spiritual practice, prayer, or act of devotion performed during the month of Kartik yields spiritual benefit hundreds of times greater than at any other time of the year. The scriptures glorify this month by declaring that even a tiny ghee lamp offered with genuine love and devotion during Kartik can burn away generations of accumulated karma, illuminate the heart, and awaken one's eternal relationship with the Supreme Lord.

The Divine Pastime of Lord Damodara
The heart and essence of Kartik month is the sweet pastime of Lord Damodara, recorded in the Tenth Canto of Srimad-Bhagavatam. On a holy day in Gokula, Mother Yashoda was churning butter while singing loving songs about her divine child Krishna. Young Krishna arrived, feeling hungry, and Mother Yashoda lovingly began to feed Him. Suddenly, the milk boiling on the stove began to spill over. Mother Yashoda set Krishna down to tend to the milk. Feeling playfully indignant, Lord Krishna broke a pot of butter and began feeding the freshly churned butter to the monkeys.

When Mother Yashoda returned and saw the broken pot, she decided to playfully bind young Krishna to a wooden mortar (ukhala) with a soft rope to teach Him a lesson. However, a divine wonder occurred: no matter how many ropes Mother Yashoda joined together, the rope was always short by exactly two inches!

The Mystery of the Two Inches
Vedic acharyas explain that these two inches symbolize two indispensable elements of spiritual life:
1. The Sincere Effort of the Devotee: The tireless, loving endeavor of the seeker to serve and remember God.
2. The Unbounded Grace of the Lord: The Supreme Lord's infinite mercy, consenting to be bound only by pure, unselfish love.

Seeing His mother's unyielding affection and fatigue, Lord Krishna voluntarily accepted the binding, earning the transcendental name Sri Damodara—the Supreme Lord who is bound around the waist by the ropes of divine love.

Daily Observances: Deepdaan and Sri Damodarashtakam
Every evening throughout the thirty days of Kartik, devotees gather at twilight to sing the eight verses of Sri Damodarashtakam, an ancient Sanskrit hymn composed by the great sage Satyavrata Muni in the Padma Purana. As the melodious chant echoes through the temple hall, every attendee offers a lit ghee lamp to the Deities of Sri Sri Radha Damodara, praying for pure devotion and spiritual protection.

Grand Celebrations at Hare Krishna Movement Dehradun
At Hare Krishna Movement Dehradun, the month of Kartik is celebrated with unmatched enthusiasm and spiritual grandeur:
- Daily Evening Deepdaan Seva at 8:00 PM with congregational Harinama Kirtan.
- Daily Chanting of Sri Damodarashtakam accompanied by acoustic musical instruments.
- Sri Nauka Vihar Festival, where the Deities are taken on a grand water ride amidst lotus flowers and glowing lamps.
- Distribution of sanctified Prasadam sweets and grand feast offerings to all visiting pilgrims.

We warmly invite you, your family, and your friends to visit Hare Krishna Mandir Dehradun during Kartik Deepotsav, offer a lamp of love to Lord Damodara, and illuminate your spiritual journey with everlasting peace and bliss.`
  },
  {
    id: 2,
    title: "Sri Gaura Purnima – Appearance Day of Sri Chaitanya Mahaprabhu",
    category: "Festivals",
    readTime: "6 min read",
    date: "March 25, 2026",
    description: "Commemorating the golden avatara, Sri Chaitanya Mahaprabhu, who inaugurated the Hare Krishna Sankirtana movement for the spiritual elevation of all souls.",
    image: "https://hkmguwahati.org/wp-content/uploads/2026/02/720x480_GP.png",
    fullContent: `SRI GAURA PURNIMA: THE APPEARANCE DAY OF SRI CHAITANYA MAHAPRABHU

The Golden Avatara of Divine Love
Sri Gaura Purnima is the transcendental appearance day of Sri Chaitanya Mahaprabhu, who appeared in Sridham Mayapur, Bengal, in the year 1486 AD on a full moon evening during a lunar eclipse. Revered across Vedic traditions as the Golden Avatara, Sri Chaitanya Mahaprabhu is Lord Sri Krishna Himself appearing in the golden complexion and ecstatic devotional mood of Srimati Radharani.

Unlike previous incarnations who appeared with weapons to destroy miscreants, Sri Chaitanya Mahaprabhu descended to conquer the hearts of all living beings through the divine weapon of Sankirtana—the congregational, joyful chanting of the Holy Names of God.

The Yuga Dharma for the Age of Kali
As prophesied in ancient Vedic texts like the Srimad-Bhagavatam (11.5.32) and the Kali-Santarana Upanishad, the prescribed method for self-realization in this current age of Kali is the congregational chanting of the Maha-Mantra:

Hare Krishna, Hare Krishna, Krishna Krishna, Hare Hare
Hare Rama, Hare Rama, Rama Rama, Hare Hare

Sri Chaitanya Mahaprabhu flooded the entire Indian subcontinent with the waves of love of God, teaching that the Holy Name carries the full divine potency, peace, and beauty of the Lord. He broke down all social, racial, and caste barriers by declaring that every soul has an equal right to chant the Holy Names and attain spiritual perfection.

The Philosophy of Achintya-Bhedabheda
Sri Chaitanya Mahaprabhu presented the highest philosophical conclusion known as Achintya-Bhedabheda-Tattva—the sublime truth of inconceivable simultaneous oneness and difference. The individual soul (jiva) is qualitatively one with the Supreme Lord in spiritual nature, yet quantitatively distinct. Just as a single drop of ocean water shares the saltiness of the ocean but cannot equal its vastness, the soul is an eternal fragmental part of God, destined to find complete fulfillment in loving service to Him.

Life and Legacy of Mahaprabhu
From His youth in Navadvipa as a brilliant scholar named Nimai Pandit to His renunciation (sannyasa) and ecstatic pastimes in Jagannath Puri, Sri Chaitanya Mahaprabhu inspired millions. His primary disciple lineage, the Six Goswamis of Vrindavan, documented His teachings and established holy places of pilgrimage that continue to inspire seekers worldwide today.

Grand Festivities at Hare Krishna Movement Dehradun
On the sacred occasion of Sri Gaura Purnima, Hare Krishna Movement Dehradun organizes spectacular day-long celebrations:
- Non-stop Harinama Sankirtan from sunrise to late evening.
- Grand Maha Abhishekam, bathing the Deities of Sri Sri Nitai Gauranga with panchamrita, sacred herbs, fruit juices, and thousands of fresh flowers.
- Enlightening spiritual discourses on the life and legacy of Lord Chaitanya.
- Distribution of a lavish, multi-course Prasadam feast to thousands of pilgrims and visitors.

Participating in Sri Gaura Purnima brings immense spiritual upliftment, inner peace, and divine joy into one's home and heart.`
  },
  {
    id: 3,
    title: "Daily Annadana Seva – Feeding Sanctified Meals to Thousands",
    category: "Prasadam & Seva",
    readTime: "4 min read",
    date: "June 10, 2026",
    description: "Discover how Hare Krishna Movement Dehradun prepares and serves hot, nutritious, Krishna-prasadam daily to pilgrims, sadhus, and the underprivileged.",
    image: "https://hkmdehradun.org/live-site/assets/12/annadaan-seva-banner1.png",
    fullContent: `DAILY ANNADANA SEVA: FEEDING SANCTIFIED MEALS TO THOUSANDS

The Sacred Culture of Prasadam Distribution
In Vedic culture and tradition, Annadana—the sharing of sanctified food—is revered as one of the highest and most sacred forms of charity. In the Bhagavad-Gita (Chapter 3, Verse 13), Lord Krishna explains the profound difference between ordinary food and sanctified food:

Devotees of the Lord are released from all kinds of sins because they eat food which is offered first in sacrifice. Others, who prepare food for personal sense gratification, eat only sin.

When fresh, pure vegetarian food is prepared in a mood of devotion and cleanliness, and then offered with love to Lord Krishna, it is transformed into Prasadam—which literally translates to Divine Mercy. Prasadam nourishes not only the physical body with healthy sustenance but also purifies the mind, calms emotions, and awakens spiritual consciousness.

Srila Prabhupada's Vision of Universal Compassion
The guiding vision behind our massive food relief initiatives springs from the heart of Srila Prabhupada, Founder-Acharya of the worldwide Hare Krishna movement. Upon seeing hungry children outside a temple in India, Srila Prabhupada instructed his disciples:

No one within a ten-mile radius of our centers should ever go hungry.

This compassionate mandate became the foundation for world-renowned charitable feeding operations that serve millions of nutritious, sanctified meals every single day.

Over 2.89 Crore Meals Served at HKM Dehradun
Embracing this sacred mission, Hare Krishna Movement Dehradun operates modern, ultra-hygienic kitchen facilities dedicated to daily food relief. Rain or shine, our Seva teams prepare and distribute thousands of hot meals daily to:
- Elderly sadhus, ascetics, and pilgrims visiting holy shrines.
- Underprivileged families, daily wage workers, and children in local communities.
- Disaster relief camps and hospital waiting areas.

Nutritional Quality and Purity
Every meal prepared at our kitchen adheres to strict quality guidelines:
- Made using pure desi ghee, fresh seasonal vegetables, and premium grains.
- Free from onion, garlic, or artificial preservatives.
- Cooked in spotlessly clean stainless-steel equipment while chanting sacred hymns.
- Served hot with warmth, dignity, and respect to every single recipient.

Partner with Us in Annadana Seva
You can celebrate significant life occasions—such as birthdays, wedding anniversaries, graduation achievements, or in loving memory of departed ancestors—by sponsoring daily Annadana Seva. By feeding a hungry soul with Krishna-prasadam, you earn everlasting spiritual merit and bring smiles to those in need.`
  },
  {
    id: 4,
    title: "Gau Seva – Protecting and Caring for Sacred Cows",
    category: "Prasadam & Seva",
    readTime: "5 min read",
    date: "May 14, 2026",
    description: "Cows hold a sacred place in Vedic tradition and are dear to Lord Krishna. Explore our Gaushala initiatives providing lifelong shelter and medical care.",
    image: "https://hkmdehradun.org/live-site/assets/12/gau-seva-banner.png",
    fullContent: `GAU SEVA: SACRED COW PROTECTION INITIATIVE

Lord Krishna: The Eternal Protector of Cows
Throughout the Vedic scriptures, Lord Krishna is lovingly addressed by names such as Gopala (the guardian of cows) and Govinda (one who brings pleasure to the cows and the earth). The Vishnu Purana invokes the Lord with this ancient prayer:

Namo brahmanya-devaya go-brahmana-hitaya ca, jagad-hitaya krishnaya govindaya namo namah.
My Lord, You are the well-wisher of the cows, the devotees, and the entire human civilization.

In the spiritual world of Goloka Vrindavan, Lord Krishna spends His mornings playing His flute amidst the herds of Surabhi cows. In Vedic philosophy, Mother Cow (Gau Mata) holds a revered status as one of the seven mothers of humanity because she selflessly feeds human society with her nourishing milk, fostering strength, intellect, and gentle qualities.

The Ecological and Spiritual Importance of Gau-Samskriti
Protecting cows is not merely a sentimental ritual; it is the cornerstone of sustainable agriculture, ecological balance, and peaceful living. Cow milk, ghee, and natural farming inputs play an indispensable role in maintaining soil fertility and human health. A society that protects and honors cows prospers materially, culturally, and spiritually, while cruelty toward animals breeds social unrest and ecological degradation.

Our Gaushala Sanctuary at HKM Dehradun
Hare Krishna Movement Dehradun maintains a peaceful, loving Gaushala sanctuary providing lifelong protection and compassionate care for dozens of cows, bulls, and young calves.

Key Highlights of Our Gau Seva Program:
- Nutritious Green Fodder: Providing daily fresh grass, clean water, organic jaggery, and mineral-rich fodder.
- Veterinary Healthcare: Round-the-clock medical attention, regular health checks, and specialized care for injured or rescue animals.
- Clean & Airy Shelter: Spacious, hygienic sheds designed for maximal comfort, protection from seasonal extremes, and freedom of movement.
- Lifelong Retirement Care: Non-milking, aged, or infirm cows are never abandoned; they receive dignified, loving care until their natural end.

How You Can Support Gau Seva
You can become an active part of this noble mission by adopting a cow, sponsoring daily fodder and jaggery, or contributing toward Gaushala medical infrastructure. Serving Gau Mata brings divine peace, good health, and family prosperity.`
  },
  {
    id: 5,
    title: "Overcoming Anxiety & Burnout: Lessons from Bhagavad-Gita for Youth",
    category: "Youth & Life Skills",
    readTime: "7 min read",
    date: "July 12, 2026",
    description: "How ancient Vedic psychology provides actionable, scientific tools to detach from exam and career anxiety and master emotional equilibrium.",
    image: "https://cdn.slidesharecdn.com/ss_thumbnails/depressionanxietystress-200613152253-thumbnail.jpg?width=640&height=640&fit=bounds",
    fullContent: `OVERCOMING ANXIETY AND BURNOUT: LESSONS FROM BHAGAVAD-GITA FOR YOUTH

The Modern Crisis of Mental Fatigue
In today's hyper-competitive world, students and young professionals frequently encounter intense exam stress, career uncertainty, performance anxiety, and digital burnout. Over 5,000 years ago on the battlefield of Kurukshetra, the mighty warrior Arjuna experienced a parallel crisis of severe anxiety, mental paralysis, and loss of direction.

Lord Krishna's timeless dialogue with Arjuna, recorded in the Bhagavad-Gita, provides humanity's most comprehensive manual on emotional resilience, mental clarity, and purposeful living.

Core Principles from Bhagavad-Gita for Stress Relief

1. The Wisdom of Detached Action (Karma Yoga)
In Chapter 2, Verse 47, Lord Krishna articulates the fundamental key to freedom from anxiety:

Karmanye vadhikaraste ma phaleshu kadachana, ma karma-phala-hetur bhur ma te sango stv akarmani.
You have a right to perform your duty, but you are not entitled to the fruits of your actions. Never consider yourself the cause of results, nor be attached to inaction.

Practical Application: Most modern stress originates from frantically obsessing over outcomes—such as exam ranks, job placements, or social appraisal—rather than focusing on the task at hand. By pouring 100% of your energy into present execution while surrendering the final outcome to God, you eliminate performance panic and achieve peak clarity.

2. Transforming the Mind into Your Greatest Friend
In Chapter 6, Verse 6, the Bhagavad-Gita states:

For him who has conquered the mind, the mind is the best of friends; but for one who has failed to do so, his mind will remain the greatest enemy.

Practical Application: A restless, undisciplined mind continuously churns out negative thoughts, self-doubt, and fear. By establishing daily habits of self-discipline, reducing digital overload, and practicing conscious focus, you transform your mind from a source of stress into your most powerful asset.

3. The Science of Mantra Meditation (Japa)
Vedic psychology teaches that sound vibration directly influences the subtle mind. Chanting the Hare Krishna Maha-Mantra for just 15 to 20 minutes every morning calms the nervous system, enhances memory retention, lowers anxiety levels, and fills the consciousness with positivity.

Join Our Youth Empowerment Programs (FOLK)
Hare Krishna Movement Dehradun conducts specialized youth workshops under the FOLK (Friends of Lord Krishna) initiative. These interactive sessions blend ancient Gita wisdom with contemporary life skills, equipping young minds to conquer stress, build character, and achieve lasting success.`
  },
  {
    id: 6,
    title: "Sri Krishna Janmashtami – Celebrating the Supreme Appearance",
    category: "Festivals",
    readTime: "8 min read",
    date: "August 20, 2026",
    description: "Immerse in the grandest celebration of the year with midnight Aarti, continuous Kirtans, 108 bhoga offerings, and joyful cultural performances.",
    fullContent: `SRI KRISHNA JANMASTHAMI: CELEBRATING THE SUPREME APPEARANCE

The Divine Advent of Sri Krishna
Sri Krishna Janmashtami is the most grand, exuberant, and sacred festival celebrated across the globe, commemorating the divine advent of Lord Sri Krishna in Mathura over 5,200 years ago. As declared by Lord Krishna Himself in the Bhagavad-Gita (Chapter 4, Verses 7 and 8):

Whenever and wherever there is a decline in religious practice and a predominant rise of irreligion, at that time I descend Myself. To deliver the pious and to annihilate the miscreants, as well as to re-establish the principles of righteousness, I appear millennium after millennium.

Lord Krishna's appearance is not a ordinary material birth conditioned by past karma, but an eternal, transcendental pastime (janma karma ca me divyam) designed to re-awaken divine love and peace in the hearts of all living entities.

The Night of Divine Deliverance
Lord Krishna appeared at midnight in the prison cell of King Kamsa, where His pure-hearted parents, Vasudeva and Devaki, were held captive. Upon His appearance, the heavy iron chains fell away, the prison doors unlocked automatically, and Vasudeva safely carried baby Krishna across the raging Yamuna River to the peaceful village of Gokula, where He was raised by Nanda Maharaja and Yashoda Maiya.

Festivities at Hare Krishna Movement Dehradun
Janmashtami at Hare Krishna Mandir Dehradun is an unforgettable celebration of devotion, light, and spiritual ecstasy:
- Continuous Harinama Kirtan: Non-stop chanting of holy mantras echoing from dawn until midnight.
- Midnight Maha Abhishekam: The ceremonial bathing of baby Krishna (Laddoo Gopal) with milk, curd, honey, ghee, fruit juices, and sanctified water amidst blowing of conch shells.
- 108 Chappan Bhoga Offering: Offering 108 distinct varieties of vegetarian delicacies prepared with love by temple chefs.
- Cultural Performances & Jhulan Seva: Devotional plays, classical dance routines, and flower swing offerings.
- Grand Prasadam Feast: Serving thousands of visiting families with sanctified birthday feast offerings.

We cordially invite you and your family to join us on Sri Krishna Janmashtami, fast until midnight, immerse in the ecstatic kirtan, and receive the boundless blessings of Lord Sri Krishna.`
  }
];

export default function BlogsPage() {
  const [selectedCategory, setSelectedCategory] = useState("All Articles");
  const [selectedBlog, setSelectedBlog] = useState<any | null>(null);

  const filteredBlogs = selectedCategory === "All Articles"
    ? ALL_BLOGS
    : ALL_BLOGS.filter(blog => blog.category === selectedCategory);

  return (
    <div className="min-h-screen bg-[#faf8f5] flex flex-col font-sans">
      {/* Main Container */}
      <main className="flex-grow pt-8 sm:pt-12 pb-20">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16">

          {/* Page Header */}
          <div className="flex flex-col items-center text-center mb-12 relative">
            <div className="flex items-center gap-3 text-[#d4af37] mb-3">
              <div className="h-px w-10 bg-current"></div>
              <span className="uppercase tracking-[0.2em] font-bold text-xs sm:text-sm">ARTICLES & INSIGHTS</span>
              <div className="h-px w-10 bg-current"></div>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-[#3b2b2f] tracking-tight mb-4">
              Latest <span className="text-[#d4af37]">Blogs</span>
            </h1>
            <p className="text-[#5c5245] max-w-2xl text-[16px] leading-relaxed">
              Explore timeless Vedic wisdom, festival highlights, community updates, and spiritual insights from Hare Krishna Movement Dehradun.
            </p>
          </div>

          {/* Category Filter Tabs */}
          <div className="flex items-center justify-center flex-wrap gap-2.5 mb-12">
            {BLOG_CATEGORIES.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 cursor-pointer ${
                  selectedCategory === category
                    ? 'bg-[#0a3d73] text-white shadow-md'
                    : 'bg-white text-[#5c5245] hover:bg-[#f4efe6] border border-[#eae4d5]'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Blog Cards Grid — Index Page Style */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredBlogs.map((blog) => (
              <motion.div
                key={blog.id}
                layoutId={`blog-card-${blog.id}`}
                onClick={() => setSelectedBlog(blog)}
                className="relative flex flex-col justify-end rounded-[40px] overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.06)] border-[8px] border-white group font-card cursor-pointer bg-[#f1f3f5] min-h-[460px] lg:min-h-[500px]"
              >
                {/* Image Section - Maintained Aspect Ratio */}
                <div className="absolute inset-0 w-full h-[65%] p-2">
                  <img
                    src={blog.image}
                    alt={blog.title}
                    className="w-full h-full object-contain object-top transition-transform duration-1000 group-hover:scale-105"
                  />
                </div>
                
                {/* Smooth frosted gradient fading up perfectly matching the design */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#f1f3f5] via-[#f1f3f5]/95 to-transparent h-[75%] mt-auto pointer-events-none"></div>

                {/* Text Section (Sitting on top of the milky background) */}
                <div className="relative z-10 flex flex-col justify-end px-6 sm:px-8 pb-3 pt-28">
                  <div className="mb-6">
                    <h2 className="text-[26px] sm:text-[30px] font-bold leading-[1.2] text-[#111827] mb-2 line-clamp-2">
                      {blog.title}
                    </h2>
                    <p className="text-[#4b5563] font-medium text-base sm:text-[17px] leading-[1.4] line-clamp-2 pr-4">
                      {blog.description}
                    </p>
                  </div>

                  <div className="flex items-center justify-end mt-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedBlog(blog);
                      }}
                      className="relative inline-block px-10 py-3 bg-white text-[#111827] font-card font-bold text-sm sm:text-[15px] uppercase tracking-wider rounded-full border-none cursor-pointer transition-all duration-200 hover:-translate-y-[3px] hover:shadow-[0_10px_20px_rgba(0,0,0,0.2)] active:-translate-y-[1px] active:shadow-[0_5px_10px_rgba(0,0,0,0.2)] group/btn z-10"
                    >
                      Read
                      <span className="absolute top-0 left-0 w-full h-full bg-white rounded-full -z-10 transition-all duration-400 group-hover/btn:scale-x-150 group-hover/btn:scale-y-150 group-hover/btn:opacity-0 inline-block"></span>
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </main>

      {/* Full Article Modal */}
      <AnimatePresence>
        {selectedBlog && (
          <div className="fixed inset-0 z-[100] bg-white overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="w-full max-w-5xl mx-auto min-h-screen bg-white p-6 sm:p-10 lg:p-16 relative"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedBlog(null)}
                className="fixed top-6 right-6 lg:top-10 lg:right-10 z-[110] w-12 h-12 bg-gray-100/80 backdrop-blur hover:bg-gray-200 rounded-full flex items-center justify-center text-gray-700 font-bold shadow-md transition-colors cursor-pointer"
              >
                ✕
              </button>

              {/* Side-by-Side Full Article Layout (Text Left, Image Right) */}
              <div className="flex flex-col-reverse lg:flex-row gap-10 lg:gap-12 items-start mt-4">
                {/* Left Side: Header + Full Article Content (Continuous) */}
                <div className="w-full lg:w-7/12 flex-grow">
                  <div className="mb-6">
                    <span className="text-[#ff7a59] text-xs sm:text-sm font-bold uppercase tracking-[0.2em] block mb-3">
                      {selectedBlog.category}
                    </span>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#18181b] leading-tight mb-4">
                      {selectedBlog.title}
                    </h2>
                    <div className="text-sm text-[#71717a] font-medium flex items-center gap-3">
                      <span>{selectedBlog.readTime}</span>
                    </div>
                  </div>

                  <div className="prose prose-lg max-w-none text-[#3f3f46] leading-relaxed whitespace-pre-line">
                    {selectedBlog.fullContent}
                  </div>

                  <div className="mt-10 pt-6 border-t border-gray-100 flex justify-end">
                    <button
                      onClick={() => setSelectedBlog(null)}
                      className="px-6 py-3 bg-[#18181b] hover:bg-black text-white font-semibold rounded-full text-sm transition-colors cursor-pointer"
                    >
                      Close Article
                    </button>
                  </div>
                </div>

                {/* Right Side: Sticky Image - Pure Image, No Empty White Box */}
                <div className="w-full lg:w-5/12 flex-shrink-0 lg:sticky lg:top-8 flex justify-center lg:justify-end items-start">
                  <img
                    src={selectedBlog.image}
                    alt={selectedBlog.title}
                    className="max-w-full max-h-[550px] w-auto h-auto rounded-2xl shadow-md"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
