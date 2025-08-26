import RoomSizeSection from "../features/room/components/RoomSizeSection.tsx";

import catSmall1 from "../assets/catSmall1.jpg";
import catSmall2 from "../assets/catSmall2.jpg";
import catMed1   from "../assets/catMed1.jpg";
import catMed2   from "../assets/catMed2.jpg";
import catBig1   from "../assets/catBig1.jpg";
import catBig2   from "../assets/catBig2.jpg";

export default function CatsLodge() {
    return (
        <div className="min-h-screen bg-surface-canvas">
            <div className="mx-auto max-w-6xl px-6 py-10">
                <header className="mb-6">
                    <h1 className="text-3xl font-bold text-text-ink">Ξενώνας Γάτας</h1>
                    <p className="text-text-ink/70 mt-2">
                        Ήσυχοι, άνετοι χώροι με παιχνίδια, cozy κρεβάτια και ειδικά σχεδιασμένες
                        γωνιές για χαλάρωση. Παρέχουμε καθημερινή φροντίδα, συνεχή επίβλεψη και
                        οργανωμένες δραστηριότητες για να περνούν οι γάτες ευχάριστα τον χρόνο τους.
                        Επιπλέον, υπάρχει πάντα διαθέσιμος κτηνίατρος για την υγεία και την ασφάλεια
                        των φιλοξενούμενων, ώστε να απολαμβάνουν ξέγνοιαστες «γατο-διακοπές».
                    </p>

                </header>

                <RoomSizeSection
                    label="Μικρά Δωμάτια"
                    items={[
                        { image: catSmall1, title: "Μικρό Γατόσπίτο.", desc: "Ιδανικό για ήσυχες γάτες." },
                        { image: catSmall2, title: "Η χαρά της γάτας σας.", desc: "Ζεστό και άνετο περιβάλλον." },
                    ]}
                />

                <RoomSizeSection
                    label="Μεσαία Δωμάτια"
                    items={[
                        { image: catMed1, title: "Μεσαίο σπίτι για γάτα.", desc: "Περισσότερος χώρος για σκαρφάλωμα." },
                        { image: catMed2, title: "Άνετα κρεβάτια.", desc: "Ισορροπημένη άνεση." },
                    ]}
                />

                <RoomSizeSection
                    label="Μεγάλα Δωμάτια"
                    items={[
                        { image: catBig1, title: "Μεγάλο Σπίτι για γατές.", desc: "Άπλετος χώρος για εξερεύνηση." },
                        { image: catBig2, title: "Με πολλά παιχνίδια.", desc: "Για ζωηρές γάτες." },
                    ]}
                />
            </div>
        </div>
    );
}
