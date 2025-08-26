import RoomSizeSection from "../features/room/components/RoomSizeSection.tsx";

import dogSmall1 from "../assets/dogSmall1.jpg";
import dogSmall2 from "../assets/dogSmall2.jpg";
import dogMed1   from "../assets/dogMed1.jpg";
import dogMed2   from "../assets/dogMed2.jpg";
import dogBig1   from "../assets/dogBig1.jpg";
import dogBig2   from "../assets/dogBig2.jpg";

export default function DogsHotel() {
    return (
        <div className="min-h-screen bg-surface-canvas">
            <div className="mx-auto max-w-6xl px-6 py-10">
                <header className="mb-6">
                    <h1 className="text-3xl font-bold text-text-ink">Ξενοδοχείο Σκύλων</h1>
                    <p className="text-text-ink/70 mt-2">
                        Καθαροί και ασφαλείς χώροι, καθημερινές βόλτες και οργανωμένο παιχνίδι για
                        κοινωνικοποίηση με άλλα σκυλιά. Οι φιλοξενούμενοι απολαμβάνουν φροντίδα,
                        άνεση και δραστηριότητες προσαρμοσμένες στην ενέργειά τους, ενώ υπάρχει
                        πάντα διαθέσιμος κτηνίατρος για την υγεία και την ασφάλεια τους. Έτσι,
                        κάθε σκύλος ζει ξέγνοιαστες και χαρούμενες «σκυλο-διακοπές».
                    </p>

                </header>

                <RoomSizeSection
                    label="Μικρά Δωμάτια"
                    items={[
                        { image: dogSmall1, title: "Το σπιτάκι.", desc: "Ιδανικό για μικρόσωμους σκύλους." },
                        { image: dogSmall2, title: "Πισίνα.", desc: "Άνετο και cozy για χαλάρωση." },
                    ]}
                />

                <RoomSizeSection
                    label="Μεσαία Δωμάτια"
                    items={[
                        { image: dogMed1, title: "Η χαλάρωση που του αξίζει.", desc: "Περισσότερος χώρος για παιχνίδι." },
                        { image: dogMed2, title: "Σπιτί για σκύλους.", desc: "Ισορροπία άνεσης και χώρου." },
                    ]}
                />

                <RoomSizeSection
                    label="Μεγάλα Δωμάτια"
                    items={[
                        { image: dogBig1, title: "Μεγαλό σπίτι για σκύλους.", desc: "Άπλετος χώρος για μεγάλους σκύλους." },
                        { image: dogBig2, title: "Μεγαλό σπιτι για σκύλους με πισίνα.", desc: "Για ενεργητικούς φιλοξενούμενους." },
                    ]}
                />
            </div>
        </div>
    );
}
