export default function Contact() {
    return (
        <div className="min-h-screen bg-surface-canvas">
            <section className="relative">
                <div className="absolute inset-0 bg-gradient-to-b from-secondary-accent/10 to-transparent" />
                <div className="relative mx-auto max-w-6xl px-6 py-12 text-center">
                    <h1 className="text-3xl font-bold text-text-ink">Επικοινωνία</h1>
                    <p className="mt-2 text-text-muted">
                        Είμαστε πάντα διαθέσιμοι για απορίες, κρατήσεις ή πληροφορίες.
                    </p>
                </div>
            </section>

            <section className="mx-auto max-w-6xl px-6 pb-16 grid gap-8 lg:grid-cols-3">

                <div className="space-y-4">
                    <div className="rounded-2xl border border-border-soft bg-surface-card p-5 shadow-sm">
                        <div className="text-sm text-text-muted">Τηλέφωνο</div>
                        <div className="mt-1 font-semibold text-text-ink">+30 210 0000000</div>
                    </div>
                    <div className="rounded-2xl border border-border-soft bg-surface-card p-5 shadow-sm">
                        <div className="text-sm text-text-muted">Email</div>
                        <div className="mt-1 font-semibold text-text-ink">hello@petstay.gr</div>
                    </div>
                    <div className="rounded-2xl border border-border-soft bg-surface-card p-5 shadow-sm">
                        <div className="text-sm text-text-muted">Διεύθυνση</div>
                        <div className="mt-1 font-semibold text-text-ink">
                            Λεωφ. Κεντρική 123, Αθήνα
                        </div>
                    </div>


                    <div className="rounded-2xl border border-border-soft overflow-hidden shadow-sm">
                        <iframe
                            title="Χάρτης"
                            className="w-full h-56"
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            src="https://maps.google.com/maps?q=Athens&t=&z=13&ie=UTF8&iwloc=&output=embed"
                        />
                    </div>
                </div>


                <div className="lg:col-span-2 rounded-2xl border border-border-soft bg-surface-card p-6 shadow-sm">
                    <form className="grid gap-4 sm:grid-cols-2">
                        <div>
                            <label className="text-sm text-text-muted">Ονοματεπώνυμο *</label>
                            <input
                                type="text"
                                required
                                className="mt-1 w-full rounded-xl border border-border-soft bg-surface-card px-3 py-2 outline-none focus:ring-2 focus:ring-primary-brand"
                            />
                        </div>
                        <div>
                            <label className="text-sm text-text-muted">Email *</label>
                            <input
                                type="email"
                                required
                                className="mt-1 w-full rounded-xl border border-border-soft bg-surface-card px-3 py-2 outline-none focus:ring-2 focus:ring-primary-brand"
                            />
                        </div>
                        <div>
                            <label className="text-sm text-text-muted">Τηλέφωνο</label>
                            <input
                                type="tel"
                                placeholder="+30 …"
                                className="mt-1 w-full rounded-xl border border-border-soft bg-surface-card px-3 py-2 outline-none focus:ring-2 focus:ring-primary-brand"
                            />
                        </div>
                        <div>
                            <label className="text-sm text-text-muted">Λόγος επικοινωνίας</label>
                            <select className="mt-1 w-full rounded-xl border border-border-soft bg-surface-card px-3 py-2 outline-none focus:ring-2 focus:ring-primary-brand">
                                <option>Κράτηση</option>
                                <option>Πληροφορίες</option>
                                <option>Άλλο</option>
                            </select>
                        </div>
                        <div className="sm:col-span-2">
                            <label className="text-sm text-text-muted">Μήνυμα *</label>
                            <textarea
                                rows={6}
                                required
                                className="mt-1 w-full rounded-xl border border-border-soft bg-surface-card px-3 py-2 outline-none focus:ring-2 focus:ring-primary-brand"
                                placeholder="Πείτε μας λίγα πράγματα για τις ημερομηνίες, το κατοικίδιο κ.λπ."
                            />
                        </div>
                        <label className="sm:col-span-2 flex items-start gap-2">
                            <input
                                type="checkbox"
                                required
                                className="mt-1 h-4 w-4 rounded border-border-soft"
                            />
                            <span className="text-sm text-text-muted">
                Συμφωνώ με την επεξεργασία των στοιχείων μου για την εξυπηρέτηση
                του αιτήματός μου.
              </span>
                        </label>

                        <div className="sm:col-span-2 mt-4">
                            <button
                                type="submit"
                                className="rounded-xl bg-primary-brand px-5 py-2.5 text-white shadow-sm hover:opacity-95"
                            >
                                Αποστολή
                            </button>
                        </div>
                    </form>
                </div>
            </section>
        </div>
    );
}
