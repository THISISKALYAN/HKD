const { db } = require('./services/firebase');
const MOCK_BLOGS = [
  {
    slug: "kartik-deepotsav",
    title: "Kartik Deepotsav in Braj – The Divine Festival of Lights",
    category: "Festivals",
    readTime: "5 min read",
    authorName: "HKM Admin",
    createdAt: "October 15, 2026",
    excerpt: "Discover the deep significance of offering ghee lamps in Kartik month and how it awakens divine devotion in our hearts.",
    coverImage: "/deepostav.webp",
    published: true,
    content: `KARTIK DEEPOTSAV IN BRAJ: THE DIVINE FESTIVAL OF LIGHTS

Introduction
Deepotsav, the festival of light, celebrates Kartik Deepotsav, a sacred celebration observed during the holy month of Kartik (October–November). Throughout Braj, devotees offer ghee lamps to Lord Krishna and Srimati Radharani, filling temples and holy places with a radiant glow. The festival represents devotion, gratitude, and remembrance of the Lord's loving pastimes.

Why Kartik Is Special
Kartik is regarded as the most auspicious month in the Vedic calendar. Scriptures describe it as especially dear to Lord Vishnu, making devotional practices performed during this time exceptionally beneficial.

The Story of Lord Damodara
The festival commemorates the pastime in which Mother Yashoda lovingly tied young Krishna to a wooden mortar after catching Him stealing butter. Although Krishna is the Supreme Lord, He allowed Himself to be bound by the affection of His devotee. This pastime teaches that sincere devotion and the Lord’s mercy go hand in hand.

Nalakuvara and Manigriva
During this pastime, Krishna delivered Nalakuvara and Manigriva, the sons of Kuvera, who had been cursed to become twin trees. By Krishna’s touch, they were freed from the curse and attained spiritual liberation.

Deepdaan During Kartik
Offering ghee lamps and singing the Damodarashtakam prayer are important practices during Kartik. These devotional activities help devotees express their love for the Lord and receive His blessings.

Celebrations in Braj
Temples throughout Braj shine with thousands of lamps, devotional songs, kirtans, and special worship ceremonies. The entire atmosphere becomes vibrant with spiritual joy and devotion.

Kartik Deepotsav at HKM Dehradun
HKM Dehradun celebrates the entire month with:
* Daily Deepdaan Seva at 8:00 PM
* Damodarashtakam Kirtan
* Nauka Vihar Festival
* Yamuna Boat Ride Pastimes
* Shobha Yatra
* Special Spiritual Programs

Join us and experience the divine blessings and spiritual joy of Kartik Deepotsav.`
  },
  {
    slug: "sri-gaura-purnima",
    title: "Sri Gaura Purnima – The Appearance of Sri Chaitanya Mahaprabhu",
    category: "Festivals",
    readTime: "6 min read",
    authorName: "HKM Admin",
    createdAt: "March 14, 2026",
    excerpt: "Explore the divine descent of the golden avatar, Sri Chaitanya Mahaprabhu, and His revolutionary sankirtan movement.",
    coverImage: "https://hkmguwahati.org/wp-content/uploads/2026/02/720x480_GP.png",
    published: true,
    content: `SRI GAURA PURNIMA: THE APPEARANCE OF SRI CHAITANYA MAHAPRABHU

The Golden Avatar
Sri Gaura Purnima celebrates the divine appearance of Sri Chaitanya Mahaprabhu, the Supreme Lord who appeared in Navadvipa, West Bengal, over 500 years ago. Known as the Golden Avatar because of His beautiful golden complexion, He descended not with weapons, but with the boundless mercy of Harinama Sankirtan (the congregational chanting of the Holy Names).

The Yuga Dharma
Vedic scriptures, including the Srimad Bhagavatam, predict His appearance to establish the Yuga Dharma for this age of Kali. Lord Chaitanya freely distributed the most sublime gift—love of God (Krishna Prema)—to everyone, regardless of caste, creed, or background.

The Sankirtan Movement
He inaugurated the Harinama Sankirtan movement, wandering through towns and villages chanting the Hare Krishna Mahamantra:
Hare Krishna Hare Krishna Krishna Krishna Hare Hare
Hare Rama Hare Rama Rama Rama Hare Hare

This simple yet profound process of chanting is prescribed as the most effective means of self-realization in the current age.

Teachings of Lord Chaitanya
Lord Chaitanya taught that we are eternal spiritual beings, originally servants of Krishna. By chanting the Holy Names without offenses, the mirror of our heart is cleansed, allowing us to taste the nectar of divine love for which we are always anxious.

Gaura Purnima Festivities at HKM Dehradun
At Hare Krishna Mandir Dehradun, Gaura Purnima is celebrated with immense joy and spiritual fervor:
* Grand Maha-Abhishekam of Sri Sri Gaura Nitai
* Ecstatic Kirtans and Bhajans
* Enlightening discourses on Lord Chaitanya's pastimes
* Splendid pushpalankara (flower decorations)
* Distribution of grand feast prasadam

Join us on this highly auspicious day to receive the limitless blessings of Sri Chaitanya Mahaprabhu and experience true spiritual bliss.`
  },
  {
    slug: "daily-annadana-seva",
    title: "Daily Annadana Seva: Nourishing the Pilgrims in Vrindavan",
    category: "Devotion",
    readTime: "4 min read",
    authorName: "HKM Admin",
    createdAt: "June 10, 2026",
    excerpt: "Learn about the spiritual significance of Anna Daan and our daily initiative to feed hot, nutritious prasadam to sadhus and visitors.",
    coverImage: "/fh.webp",
    published: true,
    content: `DAILY ANNADANA SEVA: NOURISHING PILGRIMS IN VRINDAVAN

The Supreme Charity
In Vedic tradition, 'Anna Daan' (the donation of food) is glorified as the highest form of charity (Maha Daan). When food is first offered to the Supreme Lord, it becomes 'Prasadam'—sanctified food that nourishes not only the physical body but also purifies the soul.

Our Daily Commitment
At Hare Krishna Movement, we are committed to ensuring that no one goes hungry in the holy land of Vrindavan. Every single day, thousands of plates of hot, nutritious, and delicious Khichdi prasadam are distributed free of cost to sadhus (monks), pilgrims, visitors, and locals.

The Spiritual Benefits of Distributing Prasadam
The act of distributing and honoring prasadam is a deeply spiritual exchange. It breaks down barriers, cultivates compassion, and invokes the boundless blessings of the Lord. As described in the Bhagavad-gita, food offered in sacrifice (yajna) frees one from all karmic reactions.

How You Can Participate
This massive daily endeavor is sustained by the generous contributions of kind-hearted donors. By sponsoring Annadana on your birthdays, anniversaries, or in memory of loved ones, you partake in this immense spiritual merit. 

Join us in this noble cause. Your contribution, no matter how small, ensures that the sacred tradition of Annadana continues uninterrupted, spreading joy, health, and spiritual blessings to thousands daily.`
  },
  {
    slug: "gau-seva",
    title: "Gau Seva: The Spiritual Significance of Serving Mother Cow",
    category: "Service",
    readTime: "5 min read",
    authorName: "HKM Admin",
    createdAt: "May 05, 2026",
    excerpt: "Cows are sacred and very dear to Lord Krishna. Discover how we protect and provide lifelong care to cows at our Gaushala.",
    coverImage: "https://iskconmumbaipull-21250.kxcdn.com/web/image/2314-6e6f1f25/gau3.webp",
    published: true,
    content: `GAU SEVA: THE SPIRITUAL SIGNIFICANCE OF SERVING MOTHER COW

The Glories of Mother Cow
In the Vedic scriptures, the cow is revered as a sacred mother (Gomata) who sustains human life with her pure milk. Lord Krishna, the Supreme Personality of Godhead, is deeply fond of cows and is lovingly addressed as Govinda and Gopala—the protector of the cows.

Gau Seva in Vedic Culture
Serving cows (Gau Seva) is not merely an act of animal welfare; it is a profound spiritual practice. The scriptures state that 33 crore demigods reside in the body of a cow. Therefore, by serving a cow, one simultaneously pleases all the universal controllers.

Benefits of Gau Seva
* Spiritual Purification: Tending to cows cleanses the heart of material contamination.
* Prosperity and Peace: Homes and communities that protect and serve cows are blessed with abundance, peace, and harmony.
* Medicinal Value: Cow products (Panchagavya) are highly prized in Ayurveda for their immense medicinal and purifying properties.

Our Surabhi Goshala
Hare Krishna Mandir Dehradun operates the Surabhi Goshala, a sanctuary where cows and calves are cared for with deep love and devotion. They are provided with nutritious fodder, clean water, regular medical checkups, and a spacious, joyful environment.

Become a Gau Sevak
We invite you to visit our Goshala and experience the serene joy of Gau Seva. You can offer green grass, jaggery, and your personal time to serve these gentle beings. By supporting the Goshala through donations, you directly participate in cow protection, attracting the eternal blessings of Lord Sri Krishna.`
  },
  {
    slug: "overcoming-anxiety",
    title: "Overcoming Anxiety: Timeless Wisdom from the Bhagavad-Gita",
    category: "Wisdom",
    readTime: "7 min read",
    authorName: "HKM Admin",
    createdAt: "July 22, 2026",
    excerpt: "Modern life is full of stress, but the 5000-year-old teachings of the Bhagavad-gita offer practical, deeply spiritual solutions for finding lasting peace.",
    coverImage: "https://hkmdehradun.org/live-site/assets/12/gita-wisdom.png",
    published: true,
    content: `OVERCOMING ANXIETY: TIMELESS WISDOM FROM THE BHAGAVAD-GITA

The Modern Epidemic
In today's fast-paced, hyper-connected world, anxiety, stress, and depression have become a global epidemic. Despite unprecedented technological advancements, true inner peace remains elusive for many. 

Arjuna's Dilemma
Over 5,000 years ago on the battlefield of Kurukshetra, the great warrior Arjuna faced a profound crisis. Overwhelmed by anxiety, confusion, and grief, he dropped his weapons and turned to Lord Krishna for guidance. This conversation forms the essence of the Bhagavad-gita.

The Root Cause of Anxiety
Lord Krishna explains that the root cause of our anxiety is our false identification with the temporary material body and our attachment to the unpredictable results of our actions. We constantly worry about protecting what we have and acquiring what we don't.

Practical Solutions from the Gita
1. Know Thy Self: The Gita's primary teaching is that we are not the perishable body, but eternal spiritual souls (Atman). Understanding our eternal nature instantly diminishes the fear of loss and death.
2. Detached Action (Karma Yoga): Krishna advises us to perform our duties diligently but to detach ourselves from the results. "You have a right to perform your prescribed duty, but you are not entitled to the fruits of action." (BG 2.47). By offering the results to the Supreme, we work without the heavy burden of anxiety.
3. The Power of Meditation and Mantra: The mind is famously described as restless and turbulent like the wind. The Gita recommends controlling the mind through constant practice and detachment. In the current age, the most effective meditation is chanting the Holy Names—the Hare Krishna Mahamantra—which calms the mind and cleanses the heart.

Finding True Peace
True peace comes from realizing our relationship with the Supreme Lord. Krishna declares, "A person in full consciousness of Me, knowing Me to be the ultimate beneficiary of all sacrifices and austerities, the Supreme Lord of all planets and demigods, and the benefactor and well-wisher of all living entities, attains peace from the pangs of material miseries." (BG 5.29).

By applying these timeless principles, we can navigate the challenges of modern life with a calm, focused, and joyful mind.`
  },
  {
    slug: "sri-krishna-janmashtami",
    title: "Sri Krishna Janmashtami – Celebrating the Supreme Appearance",
    category: "Festivals",
    readTime: "8 min read",
    authorName: "HKM Admin",
    createdAt: "August 20, 2026",
    excerpt: "Join the most ecstatic celebration of the year marking the appearance of Lord Sri Krishna, featuring grand kirtans and midnight feasts.",
    coverImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSifUgNN81-ateX-Kjn4ZH2AoRBO53EoKFEiSypT-LTBzbg5fBSe-KFBhk&s=10",
    published: true,
    content: `SRI KRISHNA JANMASTHAMI: CELEBRATING THE SUPREME APPEARANCE

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

async function seedBlogs() {
  console.log('Starting seed process...');
  let count = 0;
  for (const blog of MOCK_BLOGS) {
    try {
      await db.collection('blogs').doc(blog.slug).set({
        ...blog,
        createdAt: new Date(blog.createdAt)
      });
      console.log(`Seeded blog: ${blog.slug}`);
      count++;
    } catch (err) {
      console.error(`Error seeding ${blog.slug}:`, err);
    }
  }
  console.log(`Successfully seeded ${count} blogs.`);
  process.exit(0);
}

seedBlogs();
