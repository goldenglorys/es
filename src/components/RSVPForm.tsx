import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { MagneticButton } from "./MagneticButton";
import { InputHighlight } from "./InputHighlight";
import { RegistryCard } from "./RegistryCard";
import { rsvpService, type RSVPData } from "../services/rsvpService";
import { Loader2 } from "lucide-react";
import { clsx } from "clsx";
import confetti from "canvas-confetti";

export const RSVPForm = () => {
  const [formData, setFormData] = useState<RSVPData>({
    full_name: "",
    attending: false,
    email: "",
    dietary: "",
    note: "",
  });

  const [phase, setPhase] = useState<1 | 2 | 3 | 4>(1);
  const [selectedAttending, setSelectedAttending] = useState<boolean | null>(
    null,
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [noteFocused, setNoteFocused] = useState(false);

  const handleInputChange =
    (field: keyof RSVPData) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setFormData((prev) => ({ ...prev, [field]: e.target.value }));
      if (phase === 1 && field === "full_name") setPhase(2);
    };

  const handleSelection = (attending: boolean) => {
    setSelectedAttending(attending);
    setFormData((prev) => ({ ...prev, attending }));
    setPhase(4);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.full_name) {
      toast.error("Please provide your name", {
        style: { backgroundColor: "#922049", color: "white", border: "none" },
      });
      return;
    }

    setIsSubmitting(true);
    const { error } = await rsvpService.submitRSVP(formData);
    setIsSubmitting(false);

    if (error) {
      toast.error("Something went wrong. Please try again.", {
        style: {
          backgroundColor: "var(--color-brand-wine)",
          color: "white",
          border: "none",
        },
      });
    } else {
      toast.success("Your RSVP has been beautifully received.", {
        style: {
          backgroundColor: "var(--color-brand-wine)",
          color: "white",
          border: "none",
        },
      });
      if (formData.attending) {
        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#FF4689', '#922049', '#FFAECD', '#FFF5E1'],
          gravity: 0.8
        });
      } else {
        // Subtle, gentle falling effect for decline
        confetti({
          particleCount: 30,
          spread: 150,
          origin: { y: 0 }, 
          colors: ['#922049', '#D9C5C8'],
          gravity: 0.1, 
          scalar: 1,
          ticks: 400, 
          shapes: ['circle']
        });
      }
      setSubmitted(true);
    }
  };

  // Intro text variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.8, delayChildren: 0.5 },
    },
  };

  const itemVariants: any = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 1.5, ease: "easeOut" } },
  };

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center mt-32 px-6"
      >
        <h2 className="font-serif text-5xl md:text-7xl mb-6 text-[var(--color-brand-wine)] tracking-wide">
          Thank You
        </h2>
        {formData.attending ? (
          <p className="font-sans font-medium text-[var(--color-brand-wine)] text-2xl md:text-3xl mt-6 tracking-wide drop-shadow-sm">
            We can't wait to celebrate with you.
          </p>
        ) : (
          <p className="font-sans font-medium text-[var(--color-brand-wine)] text-2xl md:text-3xl mt-6 tracking-wide drop-shadow-sm">
            You will be deeply missed.
          </p>
        )}
      </motion.div>
    );
  }

  return (
    <div className="w-full max-w-2xl mx-auto px-6 relative z-10 pt-20 pb-32 min-h-screen">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="text-center mb-24"
      >
        <motion.p
          variants={itemVariants}
          className="font-serif italic text-2xl lg:text-3xl text-[var(--color-brand-wine)]/90 tracking-wide mb-6"
        >
          With joyful hearts,
        </motion.p>
        <motion.p
          variants={itemVariants}
          className="font-sans font-light text-lg md:text-xl uppercase tracking-[0.3em] text-[var(--color-brand-wine)]/80 mb-6"
        >
          we invite you to celebrate this special day with us.
        </motion.p>
        <motion.p
          variants={itemVariants}
          className="font-sans font-light text-[var(--color-brand-wine)]/90 text-lg mb-8 max-w-xl mx-auto leading-relaxed"
        >
          Kindly share your response below by June 15, 2026. We truly hope you can join us as we begin this beautiful new chapter together 🤍
        </motion.p>
        <motion.h1
          variants={itemVariants}
          className="font-serif text-6xl md:text-8xl lg:text-9xl font-bold tracking-tight text-[var(--color-brand-wine)] my-10"
        >
          Enyonam
          <br />
          <span className="text-[var(--color-brand-hotpink)] text-4xl lg:text-6xl italic">
            &amp;
          </span>
          <br /> Solomon
        </motion.h1>
      </motion.div>

      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3.5, duration: 2 }}
      >
        <div className="mb-4">
          <InputHighlight
            label="Full name*"
            name="full_name"
            value={formData.full_name}
            onChange={handleInputChange("full_name")}
            required
          />
          <p className="text-left text-sm text-[var(--color-brand-wine)]/70 font-sans -mt-4 pl-1">Please enter your full name</p>
        </div>

        <AnimatePresence>
          {formData.full_name.length > 2 && phase < 4 && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="flex flex-col items-center gap-6 mt-16 overflow-hidden w-full"
            >
              <h3 className="font-serif text-2xl text-[var(--color-brand-wine)] mb-2">Will you attend?</h3>
              <div className="flex flex-col sm:flex-row justify-center items-center gap-6 w-full">
                <MagneticButton
                  type="button"
                  onClick={() => handleSelection(true)}
                  variant="primary"
                >
                  Absolutely! Wouldn't miss it 🥳
                </MagneticButton>
                <MagneticButton
                  type="button"
                  onClick={() => handleSelection(false)}
                  variant="outline"
                >
                  Sadly, I wouldn't be able to
                </MagneticButton>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence mode="wait">
          {phase === 4 && selectedAttending === true && (
            <motion.div
              key="attending"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="mt-16 space-y-12"
            >
              <div>
                <InputHighlight
                  label="Email Address*"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange("email")}
                />
                <p className="text-left text-sm text-[var(--color-brand-wine)]/70 font-sans -mt-4 pl-1">Kindly enter your email address for important updates on our wedding</p>
              </div>
              <InputHighlight
                label="Do you have any dietary restrictions/allergies?"
                name="dietary"
                value={formData.dietary}
                onChange={handleInputChange("dietary")}
              />

              <div className="relative w-full mb-10 pt-6">
                <textarea
                  className={clsx(
                    "w-full bg-transparent border-0 border-b border-[var(--color-brand-purple)]/50 px-0 py-2 text-xl outline-none transition-colors",
                    "focus:border-transparent text-[var(--color-brand-wine)] font-sans font-light rounded-none resize-none min-h-[120px]",
                  )}
                  value={formData.note}
                  onChange={handleInputChange("note")}
                  onFocus={() => setNoteFocused(true)}
                  onBlur={() => setNoteFocused(false)}
                />
                <label
                  className={clsx(
                    "absolute left-0 top-8 text-gray-400 font-serif text-2xl cursor-text transition-all duration-300 pointer-events-none transform tracking-wide",
                    noteFocused || formData.note
                      ? "-translate-y-8 scale-75 origin-left text-[var(--color-brand-hotpink)]"
                      : "",
                  )}
                >
                  Please feel free to leave us a note, prayer, or well wishes 💕
                </label>

                <AnimatePresence>
                  {noteFocused && (
                    <motion.div
                      layoutId="glow-note"
                      className="absolute bottom-0 left-0 w-full h-[1px] bg-[var(--color-brand-hotpink)] shadow-[0_0_8px_rgba(255,70,137,0.8)]"
                      initial={{ opacity: 0, scaleX: 0 }}
                      animate={{ opacity: 1, scaleX: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </AnimatePresence>
              </div>

              <div className="mt-8">
                <p className="text-center font-serif text-[var(--color-brand-wine)] text-xl mb-4 tracking-wide">Also check out our registry.</p>
                <RegistryCard />
              </div>

              <div className="flex justify-center mt-12 pb-20">
                <MagneticButton type="submit" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <Loader2 className="animate-spin w-6 h-6 mx-auto" />
                  ) : (
                    "Send RSVP"
                  )}
                </MagneticButton>
              </div>
            </motion.div>
          )}

          {phase === 4 && selectedAttending === false && (
            <motion.div
              key="declined"
              initial={{ opacity: 0, filter: "blur(10px)" }}
              animate={{ opacity: 1, filter: "blur(0px)" }}
              transition={{ duration: 1.2 }}
              className="mt-16 flex flex-col items-center"
            >
              <h3 className="font-serif text-3xl md:text-5xl text-[var(--color-brand-wine)] mb-6 tracking-wider text-center">
                We will miss you!
              </h3>
              <p className="font-sans text-[var(--color-brand-wine)]/80 text-center mb-10 text-lg">
                Please feel free to leave us a note and check out our registry.
              </p>
              
              <div className="w-full mb-10 pt-6 relative">
                <textarea
                  className={clsx(
                    "w-full bg-transparent border-0 border-b border-[var(--color-brand-purple)] px-0 py-2 text-xl outline-none transition-colors",
                    "focus:border-transparent text-[var(--color-brand-butter)] font-sans font-light rounded-none resize-none min-h-[100px]",
                  )}
                  value={formData.note}
                  onChange={handleInputChange("note")}
                  onFocus={() => setNoteFocused(true)}
                  onBlur={() => setNoteFocused(false)}
                />
                <label
                  className={clsx(
                    "absolute left-0 top-8 text-gray-400 font-serif text-2xl cursor-text transition-all duration-300 pointer-events-none transform tracking-wide",
                    noteFocused || formData.note
                      ? "-translate-y-8 scale-75 origin-left text-[var(--color-brand-hotpink)]"
                      : "",
                  )}
                >
                  Your note...
                </label>
                <AnimatePresence>
                  {noteFocused && (
                    <motion.div
                      layoutId="glow-note-decline"
                      className="absolute bottom-0 left-0 w-full h-[1px] bg-[var(--color-brand-hotpink)] shadow-[0_0_8px_rgba(255,70,137,0.8)]"
                      initial={{ opacity: 0, scaleX: 0 }}
                      animate={{ opacity: 1, scaleX: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </AnimatePresence>
              </div>
              <div className="w-full mb-12">
                <RegistryCard />
              </div>
              <MagneticButton
                type="submit"
                variant="outline"
                disabled={isSubmitting}
                className="mb-8"
              >
                {isSubmitting ? (
                  <Loader2 className="animate-spin w-5 h-5 mx-auto" />
                ) : (
                  "Confirm Decline"
                )}
              </MagneticButton>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.form>
    </div>
  );
};
