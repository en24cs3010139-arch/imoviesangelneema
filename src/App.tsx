import { useMemo, useState } from 'react';
import {
  ArrowRight,
  Bell,
  CalendarDays,
  Check,
  ChevronDown,
  Clock3,
  Film,
  Heart,
  MapPin,
  Menu,
  Play,
  Search,
  ShieldCheck,
  Sparkles,
  Star,
  Ticket,
  UserRound,
  X,
} from 'lucide-react';

type Movie = {
  id: number;
  title: string;
  genre: string;
  duration: string;
  rating: string;
  score: string;
  poster: string;
  backdrop: string;
  description: string;
  language: string;
  certificate: string;
};

type Showtime = {
  time: string;
  type: string;
  price: number;
};

const movies: Movie[] = [
  {
    id: 1,
    title: 'The Last Horizon',
    genre: 'Adventure',
    duration: '2h 18m',
    rating: 'U/A 13+',
    score: '8.9',
    poster: 'https://images.pexels.com/photos/19830143/pexels-photo-19830143.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    backdrop: 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    description: 'When a cartographer finds a signal from beyond the edge of every map, she joins a fearless crew on a voyage that will redefine home.',
    language: 'English',
    certificate: 'U/A 13+',
  },
  {
    id: 2,
    title: 'Neon Nights',
    genre: 'Drama',
    duration: '1h 56m',
    rating: 'U/A 16+',
    score: '8.6',
    poster: 'https://images.pexels.com/photos/25746379/pexels-photo-25746379.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    backdrop: 'https://images.pexels.com/photos/7991139/pexels-photo-7991139.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    description: 'Two strangers, one sleepless city, and a single night to decide whether their lives are about to change forever.',
    language: 'English',
    certificate: 'U/A 16+',
  },
  {
    id: 3,
    title: 'The Quiet Room',
    genre: 'Thriller',
    duration: '2h 04m',
    rating: 'A',
    score: '8.2',
    poster: 'https://images.pexels.com/photos/7991506/pexels-photo-7991506.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    backdrop: 'https://images.pexels.com/photos/7991318/pexels-photo-7991318.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    description: 'A celebrated author retreats to a remote cinema to finish her final novel and discovers the story is writing her back.',
    language: 'English',
    certificate: 'A',
  },
  {
    id: 4,
    title: 'A Summer in June',
    genre: 'Romance',
    duration: '2h 11m',
    rating: 'U',
    score: '8.4',
    poster: 'https://images.pexels.com/photos/5869890/pexels-photo-5869890.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    backdrop: 'https://images.pexels.com/photos/7991409/pexels-photo-7991409.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    description: 'A summer postcard becomes an unexpected second chance for two people who thought they had already said goodbye.',
    language: 'English',
    certificate: 'U',
  },
];

const showtimes: Showtime[] = [
  { time: '10:30 AM', type: 'Standard', price: 180 },
  { time: '01:15 PM', type: 'IMAX', price: 320 },
  { time: '04:20 PM', type: 'Standard', price: 220 },
  { time: '07:45 PM', type: 'IMAX', price: 380 },
  { time: '10:50 PM', type: 'Standard', price: 220 },
];

const genres = ['All movies', 'Adventure', 'Drama', 'Thriller', 'Romance'];
const dates = [
  { day: 'Today', date: '24', month: 'JUN' },
  { day: 'Wed', date: '25', month: 'JUN' },
  { day: 'Thu', date: '26', month: 'JUN' },
  { day: 'Fri', date: '27', month: 'JUN' },
  { day: 'Sat', date: '28', month: 'JUN' },
];

function App() {
  const [activeGenre, setActiveGenre] = useState('All movies');
  const [search, setSearch] = useState('');
  const [selectedMovie, setSelectedMovie] = useState<Movie>(movies[0]);
  const [selectedDate, setSelectedDate] = useState(0);
  const [selectedShowtime, setSelectedShowtime] = useState<Showtime | null>(null);
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const [showBooking, setShowBooking] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [favorites, setFavorites] = useState<number[]>([]);

  const filteredMovies = useMemo(() => movies.filter((movie) => {
    const matchesGenre = activeGenre === 'All movies' || movie.genre === activeGenre;
    const matchesSearch = movie.title.toLowerCase().includes(search.toLowerCase()) || movie.genre.toLowerCase().includes(search.toLowerCase());
    return matchesGenre && matchesSearch;
  }), [activeGenre, search]);

  const toggleFavorite = (id: number) => {
    setFavorites((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]);
  };

  const chooseMovie = (movie: Movie) => {
    setSelectedMovie(movie);
    setSelectedShowtime(null);
    setSelectedSeats([]);
    document.getElementById('showtimes')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const toggleSeat = (seat: string) => {
    setSelectedSeats((current) => current.includes(seat) ? current.filter((item) => item !== seat) : [...current, seat]);
  };

  const total = selectedSeats.length * (selectedShowtime?.price ?? 0);

  return (
    <div className="app-shell">
      <header className="site-header">
        <a className="brand" href="#top" aria-label="IMovies home">
          <span className="brand-mark"><Film size={18} strokeWidth={2.5} /></span>
          <span>i<span>Movies</span></span>
        </a>
        <nav className={`main-nav ${mobileMenu ? 'is-open' : ''}`}>
          <a className="active" href="#movies">Movies</a>
          <a href="#showtimes">Showtimes</a>
          <a href="#experience">Experience</a>
          <a href="#offers">Offers</a>
        </nav>
        <div className="header-actions">
          <button className="icon-button notification" aria-label="Notifications"><Bell size={19} /><span /></button>
          <button className="profile-button"><span className="profile-avatar">AN</span><span className="profile-name">Alex Nolan</span><ChevronDown size={15} /></button>
          <button className="menu-button icon-button" aria-label="Open menu" onClick={() => setMobileMenu(!mobileMenu)}><Menu size={21} /></button>
        </div>
      </header>

      <main id="top">
        <section className="hero-section" id="experience">
          <div className="hero-copy">
            <div className="eyebrow"><Sparkles size={14} /> Curated for your next escape</div>
            <h1>Stories worth<br /><em>staying for.</em></h1>
            <p>Find your seat for the moments that move you. Discover the latest releases, intimate screenings, and unforgettable cinema experiences.</p>
            <div className="hero-actions">
              <a className="primary-button" href="#movies">Explore movies <ArrowRight size={17} /></a>
              <button className="text-button"><span className="play-circle"><Play size={13} fill="currentColor" /></span> Watch trailer</button>
            </div>
            <div className="hero-meta"><span><ShieldCheck size={16} /> Safe & secure booking</span><span><Ticket size={16} /> Instant confirmation</span></div>
          </div>
          <div className="hero-art">
            <div className="hero-image-wrap"><img src={selectedMovie.backdrop} alt="Cinema audience" /></div>
            <div className="hero-card">
              <div className="live-dot" /> Now showing
              <strong>{selectedMovie.title}</strong>
              <span>{selectedMovie.genre} · {selectedMovie.duration}</span>
              <button onClick={() => chooseMovie(selectedMovie)}>Book tickets <ArrowRight size={15} /></button>
            </div>
            <div className="hero-stamp"><span>IM</span><small>YOUR MOVIE<br />MOMENTS</small></div>
          </div>
        </section>

        <section className="browse-section" id="movies">
          <div className="section-heading"><div><span className="section-kicker">THE SILVER SCREEN</span><h2>What will you watch?</h2></div><a href="#movies" className="view-all">View all <ArrowRight size={15} /></a></div>
          <div className="filter-row">
            <div className="genre-tabs">{genres.map((genre) => <button key={genre} className={activeGenre === genre ? 'selected' : ''} onClick={() => setActiveGenre(genre)}>{genre}</button>)}</div>
            <label className="search-box"><Search size={17} /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search movies" /><span>⌘ K</span></label>
          </div>
          <div className="movie-grid">
            {filteredMovies.map((movie) => <article className={`movie-card ${selectedMovie.id === movie.id ? 'is-active' : ''}`} key={movie.id}>
              <div className="poster-wrap"><img src={movie.poster} alt={`${movie.title} poster`} /><div className="poster-shade" /><button className={`favorite-button ${favorites.includes(movie.id) ? 'liked' : ''}`} aria-label={`Favorite ${movie.title}`} onClick={() => toggleFavorite(movie.id)}><Heart size={18} fill={favorites.includes(movie.id) ? 'currentColor' : 'none'} /></button><div className="rating-pill"><Star size={13} fill="currentColor" /> {movie.score}</div><button className="quick-book" onClick={() => chooseMovie(movie)}>Book now <ArrowRight size={14} /></button></div>
              <div className="movie-info"><div><h3>{movie.title}</h3><p>{movie.genre} <span>·</span> {movie.duration}</p></div><span className="certificate">{movie.certificate}</span></div>
            </article>)}
          </div>
          {filteredMovies.length === 0 && <div className="empty-state">No movies match that search. Try another title or genre.</div>}
        </section>

        <section className="booking-section" id="showtimes">
          <div className="booking-backdrop" style={{ backgroundImage: `url(${selectedMovie.backdrop})` }} />
          <div className="booking-overlay" />
          <div className="booking-content">
            <div className="booking-intro"><span className="section-kicker light">PLAN YOUR VISIT</span><h2>Make it an<br /><em>evening.</em></h2><p>Choose a date and showtime for <strong>{selectedMovie.title}</strong>.</p><div className="location-select"><MapPin size={16} /><span>IMovies · Indiranagar</span><ChevronDown size={15} /></div></div>
            <div className="booking-panel">
              <div className="date-picker">{dates.map((date, index) => <button key={date.date} className={selectedDate === index ? 'selected' : ''} onClick={() => { setSelectedDate(index); setSelectedShowtime(null); }}><span>{date.day}</span><strong>{date.date}</strong><small>{date.month}</small></button>)}</div>
              <div className="showtime-header"><span>Available showtimes</span><span className="showtime-note"><Clock3 size={14} /> All times in local time</span></div>
              <div className="showtime-list">{showtimes.map((showtime) => <button key={showtime.time} className={`showtime ${selectedShowtime?.time === showtime.time ? 'selected' : ''}`} onClick={() => { setSelectedShowtime(showtime); setSelectedSeats([]); }}><strong>{showtime.time}</strong><span>{showtime.type}</span><small>₹{showtime.price}</small></button>)}</div>
              <div className="selected-summary">{selectedShowtime ? <><span><Check size={15} /> {selectedShowtime.time} selected</span><button onClick={() => setShowBooking(true)} disabled={!selectedShowtime}>Choose seats <ArrowRight size={15} /></button></> : <span>Select a showtime to continue</span>}</div>
            </div>
          </div>
        </section>

        <section className="perks-section" id="offers"><div><span className="perk-icon"><Ticket size={21} /></span><strong>Simple booking</strong><p>Pick a film, choose a seat, enjoy the show.</p></div><div><span className="perk-icon"><MapPin size={21} /></span><strong>Great locations</strong><p>Premium screens in the heart of your city.</p></div><div><span className="perk-icon"><ShieldCheck size={21} /></span><strong>Book with confidence</strong><p>Instant confirmation and easy cancellation.</p></div></section>
      </main>

      {showBooking && selectedShowtime && <div className="modal-backdrop" role="presentation" onClick={() => setShowBooking(false)}><div className="seat-modal" role="dialog" aria-modal="true" aria-label="Select seats" onClick={(event) => event.stopPropagation()}><button className="close-modal" aria-label="Close" onClick={() => setShowBooking(false)}><X size={19} /></button><div className="modal-title"><span className="section-kicker">SELECT YOUR SEATS</span><h2>{selectedMovie.title}</h2><p>{selectedShowtime.time} · {selectedShowtime.type} · {dates[selectedDate].day}, {dates[selectedDate].date} Jun</p></div><div className="screen-label">SCREEN</div><div className="screen-arc" /><div className="seat-grid">{['A','B','C','D','E'].map((row) => <div className="seat-row" key={row}><span className="row-label">{row}</span>{[1,2,3,4,5,6,7,8].map((number) => { const seat = `${row}${number}`; const unavailable = ['A3','B6','C2','D7','E4'].includes(seat); return <button key={seat} disabled={unavailable} className={`seat ${unavailable ? 'unavailable' : ''} ${selectedSeats.includes(seat) ? 'chosen' : ''}`} onClick={() => toggleSeat(seat)}>{number}</button>; })}</div>)}</div><div className="seat-legend"><span><i className="available" /> Available</span><span><i className="chosen" /> Selected</span><span><i className="sold" /> Sold</span></div><div className="checkout-bar"><div><span>{selectedSeats.length} {selectedSeats.length === 1 ? 'seat' : 'seats'} selected</span><strong>₹{total.toLocaleString('en-IN')}</strong></div><button className="primary-button" disabled={!selectedSeats.length} onClick={() => setShowBooking(false)}>Continue to payment <ArrowRight size={16} /></button></div></div></div>}
    </div>
  );
}

export default App;
