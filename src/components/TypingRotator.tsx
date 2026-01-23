import { useState, useEffect, useCallback } from "react";

interface TypingRotatorProps {
	prefix: string;
	words: string[];
	typingSpeed?: number;
	deletingSpeed?: number;
	pauseDuration?: number;
	className?: string;
}

export function TypingRotator({
	prefix,
	words,
	typingSpeed = 100,
	deletingSpeed = 50,
	pauseDuration = 2000,
	className = "",
}: TypingRotatorProps) {
	// Start with first word fully typed to avoid flash of empty content
	const [currentWordIndex, setCurrentWordIndex] = useState(0);
	const [displayedText, setDisplayedText] = useState(words[0] || "");
	const [isDeleting, setIsDeleting] = useState(false);
	const [isPaused, setIsPaused] = useState(true); // Start paused since word is already shown
	const [isFirstRun, setIsFirstRun] = useState(true);

	const currentWord = words[currentWordIndex];

	// Hide the server-rendered placeholder when component mounts
	useEffect(() => {
		const placeholder = document.getElementById("typing-placeholder");
		if (placeholder) placeholder.style.display = "none";
	}, []);

	// Initial pause before starting to delete the first word
	useEffect(() => {
		if (isFirstRun) {
			const timer = setTimeout(() => {
				setIsPaused(false);
				setIsDeleting(true);
				setIsFirstRun(false);
			}, pauseDuration);
			return () => clearTimeout(timer);
		}
	}, [isFirstRun, pauseDuration]);

	const tick = useCallback(() => {
		if (isPaused) return;

		if (!isDeleting) {
			// Typing
			if (displayedText.length < currentWord.length) {
				setDisplayedText(currentWord.slice(0, displayedText.length + 1));
			} else {
				// Finished typing, pause before deleting
				setIsPaused(true);
				setTimeout(() => {
					setIsPaused(false);
					setIsDeleting(true);
				}, pauseDuration);
			}
		} else {
			// Deleting
			if (displayedText.length > 0) {
				setDisplayedText(displayedText.slice(0, -1));
			} else {
				// Finished deleting, move to next word
				setIsDeleting(false);
				setCurrentWordIndex((prev) => (prev + 1) % words.length);
			}
		}
	}, [currentWord, displayedText, isDeleting, isPaused, pauseDuration, words.length]);

	useEffect(() => {
		const speed = isDeleting ? deletingSpeed : typingSpeed;
		const timer = setTimeout(tick, speed);
		return () => clearTimeout(timer);
	}, [tick, isDeleting, typingSpeed, deletingSpeed]);

	return (
		<span className={className}>
			{prefix}
			<span className="text-ink">{displayedText}</span>
			<span
				className="inline-block w-[2px] h-[1.1em] bg-ink ml-0.5 -mb-[0.15em]"
				style={{ animation: "blink 1s step-end infinite" }}
			/>
		</span>
	);
}
