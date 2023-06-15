import { useCallback, useRef } from "react";
/**
 * @param {boolean} condition - if conditons satisfies observing is disconnected
 * @param {Function} callback - runs after intersection
 * @param {} deps - useCallback dependencies
 */
const useObserveElement = (condition, callback, deps) => {
	let observer = useRef();
	return useCallback(
		(node) => {
			2;
			if (condition) return;
			if (observer.current) observer.current.disconnect();
			observer.current = new IntersectionObserver((entries) => {
				if (entries[0].isIntersecting) {
					callback();
				}
			});
			if (node) observer.current.observe(node);
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[deps]
	);
};

export default useObserveElement;
