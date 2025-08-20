import dogSmall1 from "../assets/dogSmall1.jpg";
import dogSmall2 from "../assets/dogSmall2.jpg";
import dogMed1   from "../assets/dogMed1.jpg";
import catMed2   from "../assets/catMed2.jpg";
import catBig1   from "../assets/catBig1.jpg";
import catBig2   from "../assets/catBig2.jpg";

const gallery = [
    { src: dogSmall1, alt: "Δωμάτιο σκύλων" },
    { src: dogSmall2, alt: "Χώρος βόλτας" },
    { src: dogMed1, alt: "Σπιτί σκύλου" },
    { src: catMed2, alt: "Σουίτα γάτας" },
    { src: catBig1, alt: "Γατόσπίτο" },
    { src: catBig2, alt: "Χώρος ανάπαυσης" },
];

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-white">
            <section className="relative">
                <div className="absolute inset-0 bg-gradient-to-b from-gray-50 to-white" />
                <div className="relative mx-auto max-w-6xl px-4 py-14 sm:py-20 text-center">
                    <div className="mb-4 flex items-center justify-center gap-2 text-xs">
                        <span className="rounded-full bg-gray-100 px-2 py-1">Dog Hotel</span>
                        <span className="rounded-full bg-gray-100 px-2 py-1">Cat Hotel</span>
                        <span className="rounded-full bg-gray-100 px-2 py-1">24/7 Care</span>
                    </div>
                    <h1 className="text-3xl font-extrabold tracking-tight sm:text-5xl">Ποιοι είμαστε</h1>
                    <p className="mx-auto mt-4 max-w-2xl text-base text-gray-600 sm:text-lg">
                        Είμαστε ένας φιλόξενος χώρος για γάτες και σκύλους με έμφαση στην ασφάλεια, την καθαριότητα
                        και την ανθρώπινη φροντίδα. Στόχος μας: να νιώθουν σαν στο σπίτι τους 🐾
                    </p>

                    <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
                        {[
                            { label: "+500", sub: "ευχαριστημένα κατοικίδια" },
                            { label: "24/7", sub: "επιτήρηση & φροντίδα" },
                            { label: "VET", sub: "συνεργαζόμενος κτηνίατρος" },
                            { label: "ISO", sub: "πρωτόκολλα καθαρισμού" },
                        ].map((s, i) => (
                            <div key={i} className="rounded-2xl border bg-white p-4 text-center shadow-sm">
                                <div className="text-2xl font-bold">{s.label}</div>
                                <div className="text-xs text-gray-500">{s.sub}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="mx-auto max-w-6xl px-4 py-12 sm:py-16">
                <div className="mb-8 text-center">
                    <h2 className="text-2xl font-semibold sm:text-3xl">Η φιλοσοφία μας</h2>
                    <p className="mt-2 text-gray-600">Τρεις αρχές που δεν διαπραγματευόμαστε.</p>
                </div>
                <div className="grid gap-4 sm:grid-cols-3">
                    {[{t:"Ασφάλεια",e:"🛡️",d:"Ξεχωριστοί χώροι για γάτες/σκύλους, ασφαλή υλικά, καθημερινός έλεγχος εγκαταστάσεων."},{t:"Φροντίδα",e:"❤️",d:"Προσωπική προσοχή, socialization όπου ταιριάζει, προσαρμογή στο χαρακτήρα κάθε ζώου."},{t:"Συνέπεια",e:"⏱️",d:"Τήρηση προγράμματος σίτισης/βόλτας, ενημερώσεις στον ιδιοκτήτη, σαφείς πολιτικές."}].map((v,i)=> (
                        <div key={i} className="rounded-2xl border bg-white p-6 shadow-sm">
                            <div className="mb-2 flex items-center gap-2 text-lg font-semibold">
                                <span>{v.e}</span>
                                <span>{v.t}</span>
                            </div>
                            <p className="text-sm text-gray-600">{v.d}</p>
                        </div>
                    ))}
                </div>
            </section>

            <section className="bg-gray-50">
                <div className="mx-auto max-w-6xl px-4 py-12 sm:py-16">
                    <div className="mb-8 text-center">
                        <h2 className="text-2xl font-semibold sm:text-3xl">Τι προσφέρουμε</h2>
                        <p className="mt-2 text-gray-600">Υπηρεσίες σχεδιασμένες για άνεση και ηρεμία.</p>
                    </div>
                    <div className="grid gap-4 sm:grid-cols-3">
                        {[{t:"Δωμάτια σκύλων",e:"🐶",d:"Καθαροί, αεριζόμενοι χώροι με καθημερινό περίπατο και παιχνίδι."},{t:"Σουίτες γατών",e:"🐱",d:"Κατακόρυφα επίπεδα, σημεία κρυψίματος και ήσυχο περιβάλλον."},{t:"Φωτο-ενημερώσεις",e:"📷",d:"Στέλνουμε φωτογραφίες/βίντεο ώστε να είστε ήρεμοι όσο λείπετε."}].map((f,i)=> (
                            <div key={i} className="h-full rounded-2xl border bg-white p-6 shadow-sm">
                                <div className="mb-2 flex items-center gap-2 text-lg font-semibold">
                                    <span>{f.e}</span>
                                    <span>{f.t}</span>
                                </div>
                                <p className="text-sm text-gray-600">{f.d}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="mx-auto max-w-6xl px-4 py-12 sm:py-16">
                <div className="grid gap-4 sm:grid-cols-3">
                    {gallery.map((p, i) => (
                        <figure key={i} className="rounded-2xl overflow-hidden shadow-sm border border-border-soft bg-white">
                            <img src={p.src} alt={p.alt} className="w-full aspect-video object-cover" />
                            <figcaption className="p-2 text-xs text-text-muted">{p.alt}</figcaption>
                        </figure>
                    ))}
                </div>
            </section>

            <section className="bg-gray-50">
                <div className="mx-auto max-w-3xl px-4 py-12 sm:py-16">
                    <h2 className="mb-4 text-center text-2xl font-semibold sm:text-3xl">Συχνές ερωτήσεις</h2>
                    <div className="space-y-2 rounded-2xl border bg-white p-2">
                        {[{q:"Τι χρειάζεται να φέρω μαζί;",a:"Βιβλιάριο υγείας, τροφή (αν είναι ειδική), λουρί/μεταφορικό κλουβί και αγαπημένο παιχνίδι."},{q:"Υπάρχει 24ωρη επίβλεψη;",a:"Ναι, υπάρχει προσωπικό σε βάρδιες και σύστημα παρακολούθησης. Συνεργαζόμαστε με κτηνίατρο."},{q:"Πώς γίνεται η κράτηση;",a:"Δημιουργείτε προφίλ, προσθέτετε το κατοικίδιό σας και επιλέγετε διαθέσιμο δωμάτιο/ημερομηνίες."}].map((item,i)=> (
                            <details key={i} className="rounded-xl p-3 hover:bg-gray-50">
                                <summary className="cursor-pointer select-none text-sm font-medium">{item.q}</summary>
                                <p className="mt-2 text-sm text-gray-600">{item.a}</p>
                            </details>
                        ))}
                    </div>
                </div>
            </section>

            <section className="mx-auto max-w-6xl px-4 py-12 sm:py-16">
                <div className="grid items-center gap-6 rounded-2xl bg-gray-900 px-6 py-10 text-white sm:grid-cols-2">
                    <div>
                        <h3 className="text-2xl font-semibold sm:text-3xl">Είμαστε εδώ για εσάς και τους φίλους σας</h3>
                        <p className="mt-2 text-gray-300">Καλέστε μας για διαθεσιμότητα ή στείλτε μήνυμα - θα απαντήσουμε άμεσα.</p>
                    </div>
                    <div className="flex flex-wrap items-center gap-3 sm:justify-end">
                        <a href="/contact" className="rounded-2xl bg-gray-800 px-5 py-3 text-white shadow-sm ring-1 ring-white/10 transition hover:bg-gray-700">Επικοινωνία</a>
                    </div>
                </div>
            </section>
        </div>
    );
}
