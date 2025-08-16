import { Link } from "react-router-dom"
import logo from "../assets/logo.png";
import dogs from "../assets/Dogs.png";
import friends from "../assets/friends.png";
import vacation from "../assets/vacation.png";

function Home() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-secondary-accent/10 via-surface-canvas to-primary-brand/5">

            <section className="relative overflow-hidden">

                <div
                    aria-hidden
                    className="pointer-events-none absolute inset-y-0 left-0 w-40 bg-gradient-to-b from-secondary-accent/20 via-secondary-accent/10 to-transparent blur-2xl"
                />

                <div
                    aria-hidden
                    className="pointer-events-none absolute inset-y-0 right-0 w-40 bg-gradient-to-b from-primary-brand/20 via-primary-brand/10 to-transparent blur-2xl"
                />


                <div className="relative mx-auto max-w-5xl px-6 py-10 text-text-ink">
                    <h1 className="text-3xl md:text-4xl font-bold text-center flex items-center justify-center gap-2">
                        Φιλοξενία
                        <img
                            src={logo}
                            alt="Logo"
                            className="w-10 h-10 rounded-full overflow-hidden"
                        />
                        κατοικιδίων
                    </h1>

                    <p className="mt-3 leading-relaxed text-text-ink/80">
                        Παρέχουμε ασφαλή και άνετη φιλοξενία για{" "}
                        <span className="font-semibold">γάτες</span> και{" "}
                        <span className="font-semibold">σκύλους</span>. Καθαροί χώροι,
                        καθημερινή φροντίδα και εύκολη διαδικασία κράτησης για να διαλέγεις
                        το κατάλληλο δωμάτιο.
                    </p>

                    <div className="mt-6 flex items-center gap-3">
                        <Link
                            to="/booking"
                            className="rounded-xl bg-primary-brand px-4 py-2 text-white shadow-sm hover:opacity-95"
                        >
                            Κάνε Κράτηση!
                        </Link>
                        <span className="rounded-lg border border-secondary-accent/30 bg-secondary-accent/15 px-2 py-1 text-sm text-secondary-accent">
                         Νέο
                        </span>
                    </div>

                    <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div className="rounded-2xl border border-secondary-accent/20 bg-white p-5 shadow-sm">
                            <h2 className="text-xl font-semibold">Για Γάτες</h2>
                            <p className="mt-2 text-text-ink/70">
                                Ήσυχοι, cozy χώροι με παιχνίδια και άνετα κρεβάτια — ιδανικοί
                                για χαλαρές γατο-διακοπές.
                            </p>
                        </div>

                        <div className="rounded-2xl border border-secondary-accent/20 bg-white p-5 shadow-sm">
                            <h2 className="text-xl font-semibold">Για Σκύλους</h2>
                            <p className="mt-2 text-text-ink/70">
                                Καθημερινές βόλτες, παιχνίδι και ασφαλείς χώροι για
                                κοινωνικοποίηση — με πολλή προσοχή.
                            </p>
                        </div>
                    </div>
                </div>
            </section>


            <section className="mx-auto max-w-6xl px-6 py-12">
                <h2 className="text-center text-2xl font-bold text-text-ink">
                    Στιγμές από τον χώρο μας
                </h2>
                <p className="text-center text-text-muted mt-1">
                    Λίγη αίσθηση από την καθημερινότητα των φιλοξενούμενών μας.
                </p>

                <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <figure className="rounded-2xl overflow-hidden shadow-sm border border-border-soft bg-white">
                        <img
                            src={dogs}
                            alt="Ξέγνοιαστες βόλτες"
                            className="w-full h-56 object-cover"
                        />
                        <figcaption className="p-3 text-sm text-text-muted">
                            Ξέγνοιαστες βόλτες
                        </figcaption>
                    </figure>

                    <figure className="rounded-2xl overflow-hidden shadow-sm border border-border-soft bg-white">
                        <img
                            src={friends}
                            alt="Για τους φίλους"
                            className="w-full h-56 object-cover"
                        />
                        <figcaption className="p-3 text-sm text-text-muted">
                            Για τους φίλους
                        </figcaption>
                    </figure>

                    <figure className="rounded-2xl overflow-hidden shadow-sm border border-border-soft bg-white">
                        <img
                            src={vacation}
                            alt="Αξίζουμε και εμείς διακοπές"
                            className="w-full h-56 object-cover"
                        />
                        <figcaption className="p-3 text-sm text-text-muted">
                            Αξίζουμε και εμείς διακοπές
                        </figcaption>
                    </figure>
                </div>
            </section>
        </div>
    );
}

export default Home;
