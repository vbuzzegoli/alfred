const clone = src => {...src};

const alfred = store => next => action => {
	// Omit middleware if no related config in the action
	if (!action.alfred) return next(action);

	// Get the given configuration / apply default values
	const {
		actions = false,
		log = false,
		onDispatch = false,
		onError = false,
		_skip = false // used for backward compatibility with thunk / saga
	} = action.alfred;

	if (_skip) {
	    // Middleware already triggered once (backward compatibility)
	    // next(..) passes the action to the next middleware / reducer
	    return next(action);
	} else {
		// Assigning _skip flag (backward compatibility)
		const newAction = clone(action);
		newAction.alfred._skip = true;

		// Core Process
		if (Array.isArray(actions)) {
			// Handling each actions sequencially
			actions.forEach(a => {
				if (log) console.log(`[Alfred will dispatch : ${a.type}]`, a);
				if (onDispatch){
					return onDispatch(a, next, store.dispatch);
				} else {
					return store.dispatch(a);
				}
			});
		} else {
			if (log) console.log(`[Alfred could not dispatch your actions] Please make sure you are using an array in "alfred.actions"`);
			if (onError) {
				// Custom Reaction
				return onError(newAction, next, store.dispatch);
			} else {
				// Default
				return next(newAction);
			}
		}
	}
};

export default alfred;
