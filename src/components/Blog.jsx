import React, { useState, useEffect } from 'react';
import '../styles/Blog.css';

const Blog = ({ onPostClick }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerView = 3;
  const autoSlideInterval = 6000; // 6 seconds

  const blogPosts = [
    {
      id: 1,
      title: 'A Quiet Street',
      date: 'April 10, 2023',
      excerpt: 'Some moments don’t need a famous name to matter.',
      image: '/image/02.jpg',
      content: `We didn’t come here chasing landmarks. There was no plan to see something famous, no checklist in my pocket. Just a street, a city going about its day, and the comfort of walking side by side without needing to say much.

The buildings rose evenly on both sides, worn but steady, like they had watched thousands of ordinary days pass by. Traffic lights changed. People crossed the street. Life continued quietly around us. And somehow, that made the moment feel more real than standing in front of anything iconic.

My arm around her shoulder felt natural — not posed, not planned. The kind of closeness that comes from shared time, not shared locations. In that moment, the city became a background instead of a destination.

This photo reminds me that meaning doesn’t come from where you are, but from who you’re with when the world keeps moving. No famous tower. No postcard view. Just a real street, a real day, and a memory that didn’t need a name to last.
`
    },
    {
      id: 2,
      title: 'Between Sips and Thoughts',
      date: 'March 25, 2023',
      excerpt: 'Some moments exist only to slow you down.',
      image: '/image/03.jpg',
      content: `I wasn’t waiting for anyone. I wasn’t rushing anywhere. Just sitting there, fingers resting against my chin, watching the café breathe around me.

The sound of cups clinking, soft conversations blending together, light bouncing off the wooden tables — it all felt familiar in a comforting way. The iced coffee in front of me was already melting, and I didn’t mind. Some days aren’t meant to be efficient. They’re meant to be felt.

There’s something honest about places like this. No expectations. No performances. Just a quiet space where your thoughts can catch up to you. Where you realize how rarely you allow yourself to sit still without checking the time.

This photo isn’t about coffee or cafés. It’s about presence. About choosing to pause in the middle of ordinary life and letting the moment exist without needing it to mean more than it already does.`
    },
    {
      id: 3,
      title: 'Mountains and Mindfulness',
      date: 'January 14, 2024',
      excerpt: 'What snowboarding taught me about fear, freedom, and living in the present moment.',
      image: '/image/04.JPG',
      content: `At the peak of a mountain, with snow stretching endlessly in every direction, time stands still. This photo captures a moment of pure presence—no past, no future, just me, my board, and the mountain's silent invitation to let go.

I'll be honest: the first time I strapped on a snowboard, I was terrified. The slopes looked impossibly steep, the speed uncontrollable, the risk of falling a certainty. But my friend—more patient than I deserved—kept saying, "Don't fight the mountain. Flow with it." I didn't understand what that meant until I finally let go.

Snowboarding became my meditation. You can't think about your problems when you're carving down a mountain at high speed. You can't worry about tomorrow when you're focused on the next turn. The mountain demands your full attention, and in return, it gives you something rare: complete freedom from everything else.

Every time I ride, I'm reminded that life is a lot like snowboarding. You can't control the terrain—sometimes it's smooth, sometimes it's rough. But you can control how you respond. You can tense up and fight it, or you can relax, trust yourself, and enjoy the ride. Standing at the summit, I chose joy.`
    },
    {
      id: 4,
      title: 'Between Where I Was and Where I’m Going',
      date: 'May 22, 2024',
      excerpt: 'Some paths don’t announce themselves.',
      image: '/image/05.jpg',
      content: `The path wasn’t dramatic. No signs, no views worth stopping for. Just trees closing in from both sides and the sound of my steps moving forward.

I remember the weight of the bag on my shoulder more than the place itself. That quiet reminder that I was carrying something — plans, doubts, maybe both. The air was cool, steady, almost grounding. It asked nothing from me except to keep walking.

Moments like this don’t look important later, but they shape you anyway. They sit between decisions. Between versions of yourself. You don’t realize it at the time, but you’re changing with every step.

This wasn’t about getting somewhere.  
It was about being willing to move.`
    },
    {
      id: 5,
      title: 'Silent Conversations by the Water',
      date: 'August 5, 2024',
      excerpt: 'The beauty of shared silence and what it means to truly be present with someone.',
      image: '/image/06.JPG',
      content: `Some of the most meaningful conversations happen without words. This photo was taken on a quiet afternoon boat ride, where my friend and I drifted across a serene lake surrounded by mountains. We weren't talking much—just sitting, watching the water, and letting the silence speak for us.

In a world obsessed with constant communication, we've forgotten the value of shared silence. We feel the need to fill every pause with chatter, to prove we're engaged by never stopping the conversation. But there's a profound intimacy in being comfortable enough with someone to simply exist together without words.

That afternoon taught me what true companionship looks like. It's not about filling the space with noise—it's about being present, trusting that the connection runs deeper than any words could express. The stillness of the water mirrored the calm I felt in that moment, a rare kind of peace that only comes when you stop trying so hard.

Life moves fast, and we're always racing toward the next thing. But every now and then, we need moments like this—where we sit still, breathe deeply, and appreciate the company of someone who doesn't need us to be anything other than ourselves. This photo is my reminder to seek more of those moments.`
    },
    {
      id: 6,
      title: 'Coffee Before the Next Thing',
      date: 'September 18, 2024',
      excerpt: 'Not every pause is a break.',
      image: '/image/07.jpg',
      content: `I didn’t sit down this time. Just stood there with a warm cup in my hand, the street moving quietly around me. People talking behind glass, chairs scraping pavement, life continuing without asking where I was headed next.

The coffee wasn’t about caffeine. It was about slowing the moment enough to notice it. The weight of the backpack, the warmth through the cup, the cool air on my face. Small things, but real. Anchoring.

I wasn’t lost. I also wasn’t settled. This was that in-between state — where you’re still moving, but not rushing. Where you give yourself permission to exist for a minute before the next obligation pulls you forward.

Places like this don’t mark milestones.
They don’t show up in memories as destinations.
But they’re where momentum quietly resets.

I wasn’t stopping.
I was preparing to continue.`
    },
    {
      id: 7,
      title: 'Sitting at the Edge of the World',
      date: 'June 10, 2024',
      excerpt: 'A moment of solitude by a rushing river, where I found clarity in the chaos.',
      image: '/image/08.JPG',
      content: `There are moments in life when you need to sit at the edge of something wild and just listen. This photo captures one of those moments—me perched on a rock beside a roaring river, watching the water crash and swirl with unstoppable force.

I came to this spot feeling overwhelmed. Life had become a blur of decisions, expectations, and noise. Everyone had an opinion about what I should do, who I should be, and where I should go. But sitting there, with nothing but the sound of rushing water and the coolness of stone beneath me, everything else faded.

The river didn't care about my problems. It just flowed, relentless and free, carving its path through rock and time. Watching it, I realized that's what I needed to do too—stop fighting the current and start flowing with it. Not every decision has to be perfect. Not every path has to make sense to everyone else. Sometimes, you just have to trust the direction you're moving and keep going.

Solitude gets a bad reputation, but I've learned it's where I find my truest self. Away from the noise, away from the expectations, I can hear my own voice again. This river became my therapist that day, and its lesson was simple: keep moving, keep flowing, and trust that you'll find your way.`
    },
    {
      id: 8,
      title: 'Holding On While Everything Moves',
      date: 'March 20, 2025',
      excerpt: 'Sometimes the balance matters more than the view.',
      image: '/image/09.png',
      content: `I was higher than I expected to be. Not enough to feel exposed, but enough to notice how small everything below had become. The city stretched out in muted shapes — rooftops, lines, quiet repetition.

My grip tightened without thinking. Not out of fear, just awareness. The kind that comes when you realize you’re responsible for your own balance now. No railing close enough to lean on. No one telling you when to step back.

The wind was steady. The noise distant. What surprised me was how calm it felt. Like standing still in the middle of motion — watching life rush forward while you choose not to rush with it.

Moments like this don’t demand action.
They ask for presence.

I wasn’t looking for clarity.
I was practicing staying upright.`
    },
    {
      id: 9,
      title: 'Pausing Where the City Keeps Going',
      date: 'November 12, 2024',
      excerpt: 'Even moving water allows a moment of stillness.',
      image: '/image/10.png',
      content: `The river didn’t stop. It never does. It moved past quietly, carrying reflections of buildings, lights, and people who weren’t paying attention to it anymore.

I leaned there longer than I meant to. Not because I was tired, but because something about the pace felt right. The city behind me kept its rhythm — footsteps, voices, distant traffic — while this stretch of stone held me in place.

There was no decision being made. No conclusion forming. Just the feeling of standing between motion and rest, letting both exist at the same time.

I noticed how familiar that felt.
How often life asks you to keep moving even when you need a second to breathe.

This wasn’t an ending.
It wasn’t a beginning either.

Just a moment of balance,
watching everything continue —
and choosing not to rush after it.`
    },
  ];

  const nextSlide = () => {
    setCurrentIndex((prev) =>
      prev + 1 >= blogPosts.length - itemsPerView + 1 ? 0 : prev + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prev) =>
      prev - 1 < 0 ? blogPosts.length - itemsPerView : prev - 1
    );
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, autoSlideInterval);

    return () => clearInterval(interval);
  }, [currentIndex]);

  return (
      <section id="blog" className="card blog-section">
        <div className="card-content">
          <div className="section-header">
            <h2 className="section-title">Blog</h2>
            <div className="carousel-controls">
              <button className="carousel-btn" onClick={prevSlide} aria-label="Previous">
                <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                  <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
                </svg>
              </button>
              <button className="carousel-btn" onClick={nextSlide} aria-label="Next">
                <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                  <path d="M8.59 16.59L10 18l6-6-6-6-1.41 1.41L13.17 12z"/>
                </svg>
              </button>
            </div>
          </div>

          <div className="blog-carousel-container">
            <div
              className="blog-carousel"
              style={{ transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)` }}
            >
              {blogPosts.map(post => (
                <article key={post.id} className="blog-post" onClick={() => onPostClick(post)}>
                  <div className="blog-image-wrapper">
                    <img src={post.image} alt={post.title} className="blog-image" />
                  </div>
                  <div className="blog-content">
                    <span className="blog-date">{post.date}</span>
                    <h3 className="blog-title">{post.title}</h3>
                    <p className="blog-excerpt">{post.excerpt}</p>

                    <button className="blog-read-more">
                      Read more
                      <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
                        <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/>
                      </svg>
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <div className="carousel-dots">
            {Array.from({ length: blogPosts.length - itemsPerView + 1 }).map((_, index) => (
              <button
                key={index}
                className={`carousel-dot ${currentIndex === index ? 'active' : ''}`}
                onClick={() => setCurrentIndex(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </section>
  );
};

export default Blog;
