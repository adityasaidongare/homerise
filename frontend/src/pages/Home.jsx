import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const highlights = [
  {
    title: 'Practical upgrades',
    description: 'Focus on affordable improvements that raise comfort now and improve resale value later.',
  },
  {
    title: 'Guided recommendations',
    description: 'See curated suggestions based on your property type, budget, and renovation goals.',
  },
  {
    title: 'Progress that feels manageable',
    description: 'Break large home-improvement decisions into clear, realistic next steps for your family.',
  },
];

const journey = [
  'Add your property details and current condition',
  'Review suggestions with cost, difficulty, and ROI',
  'Track the upgrades you want to act on next',
];

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const elements = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.18 }
    );

    elements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, []);

  return (
    <main className="home-shell">
      <section className="hero reveal is-visible">
        <div className="hero-copy hero-copy-animated">
          <div className="hero-ambient hero-ambient-one" aria-hidden="true" />
          <div className="hero-ambient hero-ambient-two" aria-hidden="true" />
          <span className="hero-kicker">Smart planning for real homes</span>
          <h1 className="hero-title">Turn everyday properties into higher-value homes.</h1>
          <p className="hero-subtitle">
            HomeRise helps Indian homeowners choose renovations with confidence by combining property data,
            improvement ideas, and clear ROI-minded guidance.
          </p>
          <div className="hero-actions">
            <button className="hero-btn hero-btn-primary" onClick={() => navigate('/register')}>
              Create your plan
            </button>
            <button className="hero-btn hero-btn-secondary" onClick={() => navigate('/login')}>
              Sign in
            </button>
          </div>
          <div className="hero-metrics" aria-label="HomeRise value highlights">
            <div className="metric-card">
              <strong>ROI-first</strong>
              <span>See which upgrades can create the strongest return.</span>
            </div>
            <div className="metric-card">
              <strong>Budget-aware</strong>
              <span>Compare ideas that fit realistic middle-class renovation plans.</span>
            </div>
            <div className="metric-card">
              <strong>Action-ready</strong>
              <span>Move from research to a shortlist you can actually execute.</span>
            </div>
          </div>
        </div>

        <div className="hero-panel hero-stage">
          <div className="stage-badge">Animated planning canvas</div>
          <div className="orbit-scene" aria-hidden="true">
            <div className="orbit-ring orbit-ring-one" />
            <div className="orbit-ring orbit-ring-two" />
            <div className="orbit-ring orbit-ring-three" />
            <div className="orbit-dot orbit-dot-one" />
            <div className="orbit-dot orbit-dot-two" />
            <div className="orbit-dot orbit-dot-three" />
            <div className="stage-core">
              <span>HomeRise</span>
              <strong>Upgrade path</strong>
              <small>Guided by budget, ROI, and goals</small>
            </div>
          </div>

          <div className="stage-floats">
            <article className="float-card float-card-top">
              <span className="float-label">Budget window</span>
              <strong>Rs 2.5L to 4L</strong>
              <p>Balanced scope for visible improvements.</p>
            </article>
            <article className="float-card float-card-right">
              <span className="float-label">Fast win</span>
              <strong>Paint + lighting</strong>
              <p>High perceived value with manageable cost.</p>
            </article>
            <article className="float-card float-card-bottom">
              <span className="float-label">Roadmap</span>
              <div className="journey-list">
                {journey.map((step, index) => (
                  <div className="journey-item" key={step}>
                    <span className="journey-step">0{index + 1}</span>
                    <p>{step}</p>
                  </div>
                ))}
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className="home-story reveal">
        <div className="story-intro">
          <p className="panel-label">Why this feels different</p>
          <h2>We turned the landing page into a moving planning story instead of a static brochure.</h2>
        </div>
        <div className="story-grid">
          <article className="story-card">
            <span className="story-index">01</span>
            <h3>Orbital depth</h3>
            <p>Layered rings, drifting highlights, and soft motion give the page a cinematic opening frame.</p>
          </article>
          <article className="story-card">
            <span className="story-index">02</span>
            <h3>Useful motion</h3>
            <p>Floating cards are not just decorative. They preview cost, roadmap, and value signals at a glance.</p>
          </article>
          <article className="story-card">
            <span className="story-index">03</span>
            <h3>Calm pacing</h3>
            <p>Sections reveal on scroll so the experience feels guided rather than crowded.</p>
          </article>
        </div>
      </section>

      <section className="features reveal">
        {highlights.map((item, index) => (
          <article className="feature-card" key={item.title} style={{ animationDelay: `${index * 140}ms` }}>
            <p className="feature-tag">HomeRise</p>
            <h3 className="feature-title">{item.title}</h3>
            <p className="feature-desc">{item.description}</p>
          </article>
        ))}
      </section>

      <section className="home-banner reveal">
        <div>
          <p className="banner-label">Built for homeowners, not investors</p>
          <h2>Plan improvements that make your home more livable and more valuable.</h2>
        </div>
        <button className="banner-btn" onClick={() => navigate('/register')}>
          Start with your property
        </button>
      </section>
    </main>
  );
};

export default Home;
