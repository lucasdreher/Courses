/**
 * Request Handlers
 * 
 */
const // Dependencies
	_data = require('./data'),
	helpers = require('./helpers'),
	config = require('./config');

// Define the handlers
const handlers = {};

// Users *****
handlers.users = function(data, callback) {
	const acceptableMethods = [ 'post', 'get', 'put', 'delete' ];
	if (acceptableMethods.indexOf(data.method) > -1) {
		handlers._users[data.method](data, callback);
	} else {
		callback(405);
	}
};

// Container for the users sub-methods
handlers._users = {};

// Users - post
// Required data: firstName, lastName, address, email, password, tosAgreement
// Optional data: none
handlers._users.post = function(data, callback) {
	// Checks that all required fields are filled up
	const firstName =
			typeof data.payload.firstName == 'string' && data.payload.firstName.trim().length > 0
				? data.payload.firstName.trim()
				: false,
		lastName =
			typeof data.payload.lastName == 'string' && data.payload.lastName.trim().length > 0
				? data.payload.lastName.trim()
				: false,
		address =
			typeof data.payload.address == 'string' && data.payload.address.trim().length > 0
				? data.payload.address.trim()
				: false,
		email =
			typeof data.payload.email == 'string' &&
			data.payload.email.trim().length > 0 &&
			helpers.emailCheck(data.payload.email)
				? data.payload.email.trim()
				: false,
		password =
			typeof data.payload.password == 'string' && data.payload.password.trim().length > 0
				? data.payload.password.trim()
				: false,
		tosAgreement = typeof data.payload.tosAgreement == 'boolean' && data.payload.tosAgreement == true ? true : false;

	if (firstName && lastName && address && email && password && tosAgreement) {
		// Make sure that the user doesn't already exists
		_data.read('users', email, function(err, data) {
			if (err) {
				// Hash the password
				const hashedPassword = helpers.hash(password);

				// Create the user object
				if (hashedPassword) {
					const userObject = {
						firstName: firstName,
						lastName: lastName,
						address: address,
						email: email,
						hashedPassword: hashedPassword,
						tosAgreement: true
					};

					// Store the user
					_data.create('users', email, userObject, function(err) {
						if (!err) {
							callback(200);
						} else {
							console.log(err);
							callback(500, { Error: 'Could not create the new user' });
						}
					});
				} else {
					callback(500, {
						Error: `Could not hash the new user's password`
					});
				}
			} else {
				//User already exists
				callback(400, { Error: 'A user with that email already exists' });
			}
		});
	} else {
		callback(400, { Error: 'Missing required fields or the fields content are incorrect' });
	}
};

// Users - get
// Required data: email
// Optional data: none
handlers._users.get = function(data, callback) {
	// Check that the email is valid
	const email =
		typeof data.queryStringObject.email == 'string' && data.queryStringObject.email.trim().length > 0
			? data.queryStringObject.email.trim()
			: false;
	if (email) {
		// Get the token from the headers
		const token = typeof data.headers.token == 'string' ? data.headers.token : false;

		// Verify if the given token is valid for the email
		handlers._tokens.verifyToken(token, email, function(tokenIsValid) {
			if (tokenIsValid) {
				// Lookup the user
				_data.read('users', email, function(err, data) {
					if (!err && data) {
						// Remove the hashed password from the user object before returning it to the requester
						delete data.hashedPassword;
						callback(200, data);
					} else {
						callback(404);
					}
				});
			} else {
				callback(403, { Error: 'Missing required token in headers, or token is invalid' });
			}
		});
	} else {
		callback(400, { Error: 'Missing required field  or the field content are incorrect' });
	}
};

// Users - put
// Required data: email
// Optional data: firstName, lastName, address, password (at least one must be specified)
handlers._users.put = function(data, callback) {
	// Check for the required field
	const email =
		typeof data.payload.email == 'string' &&
		data.payload.email.trim().length > 0 &&
		helpers.emailCheck(data.payload.email)
			? data.payload.email.trim()
			: false;
	// Check for the optional fields
	const firstName =
			typeof data.payload.firstName == 'string' && data.payload.firstName.trim().length > 0
				? data.payload.firstName.trim()
				: false,
		lastName =
			typeof data.payload.lastName == 'string' && data.payload.lastName.trim().length > 0
				? data.payload.lastName.trim()
				: false,
		address =
			typeof data.payload.address == 'string' && data.payload.address.trim().length > 0
				? data.payload.address.trim()
				: false,
		password =
			typeof data.payload.password == 'string' && data.payload.password.trim().length > 0
				? data.payload.password.trim()
				: false;

	// Error if the email is invalid
	if (email) {
		// Error if nothing is sent to update
		if (firstName || lastName || address || password) {
			// Get the token from the headers
			const token = typeof data.headers.token == 'string' ? data.headers.token : false;
			// Verify if the given token is valid for the email
			handlers._tokens.verifyToken(token, email, function(tokenIsValid) {
				if (tokenIsValid) {
					// Lookup the user
					_data.read('users', email, function(err, userData) {
						if (!err && userData) {
							//update the fields necessary
							if (firstName) {
								userData.firstName = firstName;
							}
							if (lastName) {
								userData.lastName = lastName;
							}
							if (address) {
								userData.address = address;
							}
							if (password) {
								userData.hashedPassword = helpers.hash(password);
							}
							// Store the new updates
							_data.update('users', email, userData, function(err) {
								if (!err) {
									callback(200);
								} else {
									console.log(err);
									callback(500, { Error: 'Could not update the user' });
								}
							});
						} else {
							callback(400, { Error: 'The specified user does not exists' });
						}
					});
				} else {
					callback(403, { Error: 'Missing required token in headers, or token is invalid' });
				}
			});
		} else {
			callback(400, { Error: 'Missing fields to update' });
		}
	} else {
		callback(400, { Error: 'Missing required field  or the field content are incorrect' });
	}
};

// Users - delete
// Required data: email
handlers._users.delete = function(data, callback) {
	// Check that the email is valid
	const email =
		typeof data.queryStringObject.email == 'string' && data.queryStringObject.email.trim().length > 0
			? data.queryStringObject.email.trim()
			: false;
	if (email) {
		// Get the token from the headers
		const token = typeof data.headers.token == 'string' ? data.headers.token : false;

		// Verify if the given token is valid for the email
		handlers._tokens.verifyToken(token, email, function(tokenIsValid) {
			if (tokenIsValid) {
				// Lookup the user
				_data.read('users', email, function(err, userData) {
					if (!err && userData) {
						_data.delete('users', email, function(err) {
							if (!err) {
								// Delete each of the carts associated with the user // TODO Update to cart
								const userCarts =
										typeof userData.carts == 'object' && userData.carts instanceof Array ? userData.carts : [],
									cartsToDelete = userCarts.length;
								if (cartsToDelete > 0) {
									let cartsDeleted = 0,
										deletionErrors = false;
									// Look through the carts
									userCarts.forEach((cartId) => {
										// Delete the cart
										_data.delete('carts', cartId, function(err) {
											if (err) {
												deletionErrors = true;
											}
											cartsDeleted++;
											if (cartsDeleted == cartsToDelete) {
												if (!deletionErrors) {
													callback(200);
												} else {
													callback(500, {
														Error:
															"Errors encountered while attempting to delete all of the user's carts. All carts may not have been deleted from the system successfully"
													});
												}
											}
										});
									});
								} else {
									callback(200);
								}
							} else {
								callback(500, { Error: 'Could not delete the specified user' });
							}
						});
					} else {
						callback(400, { Error: 'Could not find the specified user' });
					}
				});
			} else {
				callback(403, { Error: 'Missing required token in headers, or token is invalid' });
			}
		});
	} else {
		callback(400, { Error: 'Missing required field  or the field content are incorrect' });
	}
};

// Tokens *****
handlers.tokens = function(data, callback) {
	const acceptableMethods = [ 'post', 'get', 'put', 'delete' ];
	if (acceptableMethods.indexOf(data.method) > -1) {
		handlers._tokens[data.method](data, callback);
	} else {
		callback(405);
	}
};

// Container for all tokens methods
handlers._tokens = {};

// Token - post
// Required data: email, password
// Optional data: none
handlers._tokens.post = function(data, callback) {
	const email =
			typeof data.payload.email == 'string' &&
			data.payload.email.trim().length > 0 &&
			helpers.emailCheck(data.payload.email)
				? data.payload.email.trim()
				: false,
		password =
			typeof data.payload.password == 'string' && data.payload.password.trim().length > 0
				? data.payload.password.trim()
				: false;
	if (email && password) {
		// Lookup the user who matches that email
		_data.read('users', email, function(err, userData) {
			if (!err && userData) {
				// Hash the sent password, and compare it to the password stored in the user object
				// Hash the password
				const hashedPassword = helpers.hash(password);
				if (hashedPassword == userData.hashedPassword) {
					// If valid, create a new token with a random name. Set expiration date 1 hour in the future
					const tokenId = helpers.createRandomString(20),
						expires = Date.now() + 1000 * 60 * 60,
						tokenObject = {
							email: email,
							id: tokenId,
							expires: expires
						};

					//Store the token
					_data.create('tokens', tokenId, tokenObject, function(err) {
						if (!err) {
							callback(200, tokenObject);
						} else {
							callback(500, { Error: 'Could not create the new token' });
						}
					});
				} else {
					callback(400, { Error: "Password did not match the specified user's stored password" });
				}
			} else {
				callback(400, { Error: 'Could not find the specified user' });
			}
		});
	} else {
		callback(400, { Error: 'Missing required field(s) or the fields content are incorrect' });
	}
};

// Token - get
// Required data: id
// Optional data: none
handlers._tokens.get = function(data, callback) {
	// Check that the id is valid
	const id =
		typeof data.queryStringObject.id == 'string' && data.queryStringObject.id.trim().length == 20
			? data.queryStringObject.id.trim()
			: false;
	if (id) {
		// Lookup the token
		_data.read('tokens', id, function(err, tokenData) {
			if (!err && tokenData) {
				callback(200, tokenData);
			} else {
				callback(404);
			}
		});
	} else {
		callback(400, { Error: 'Missing required field' });
	}
};
// Token - put
// Required data: id, extend
// Optional data: none
handlers._tokens.put = function(data, callback) {
	const id = typeof data.payload.id == 'string' && data.payload.id.trim().length == 20 ? data.payload.id.trim() : false,
		extend = typeof data.payload.extend == 'boolean' && data.payload.extend == true ? true : false;
	if (id && extend) {
		// Lookup the token
		_data.read('tokens', id, function(err, tokenData) {
			if (!err && tokenData) {
				// Check if the token isn't already expired
				if (tokenData.expires > Date.now()) {
					// Set the expiration an hour from now
					tokenData.expires = Date.now() + 1000 * 60 * 60;

					//Store the new updates
					_data.update('tokens', id, tokenData, function(err) {
						if (!err) {
							callback(200);
						} else {
							callback(500, { Error: "Could not update the token's expiration" });
						}
					});
				} else {
					callback(400, { Error: 'The token has already expired, and cannot be extended' });
				}
			} else {
				callback(400, { Error: 'The specified token does not exists' });
			}
		});
	} else {
		callback(400, { Error: 'Missing required field(s) or field(s) are invalid' });
	}
};

// Token - delete
// Required data: id
// Optional data: none
handlers._tokens.delete = function(data, callback) {
	// Check that the id is valid
	const id =
		typeof data.queryStringObject.id == 'string' && data.queryStringObject.id.trim().length == 20
			? data.queryStringObject.id.trim()
			: false;
	if (id) {
		// Lookup the token
		_data.read('tokens', id, function(err, data) {
			if (!err && data) {
				_data.delete('tokens', id, function(err) {
					if (!err) {
						callback(200);
					} else {
						callback(500, { Error: 'Could not delete the specified token' });
					}
				});
			} else {
				callback(400, { Error: 'Could not find the specified token' });
			}
		});
	} else {
		callback(400, { Error: 'Missing required field' });
	}
};

// Verify if a given token id is currently valid for a given user
handlers._tokens.verifyToken = function(id, email, callback) {
	// Look up the token
	_data.read('tokens', id, function(err, tokenData) {
		if (!err && tokenData) {
			// Check that the token is for the given user and has not expired
			if (tokenData.email == email && tokenData.expires > Date.now()) {
				callback(true);
			} else {
				callback(false);
			}
		} else {
			callback(false);
		}
	});
};

// Menus *****

handlers.menus = function(data, callback) {
	const acceptableMethods = [ 'get' ];
	if (acceptableMethods.indexOf(data.method) > -1) {
		handlers._menus[data.method](data, callback);
	} else {
		callback(405);
	}
};

// Container for all menus methods
handlers._menus = {};

// Menus - get
// Required data: email, menu
//TODO Optional data: item
handlers._menus.get = function(data, callback) {
	// Check that the email is valid
	const email =
			typeof data.queryStringObject.email == 'string' && data.queryStringObject.email.trim().length > 0
				? data.queryStringObject.email.trim()
				: false,
		menu =
			typeof data.queryStringObject.menu == 'string' && data.queryStringObject.menu.trim().length > 0
				? data.queryStringObject.menu.trim()
				: false,
		itemKey =
			typeof data.queryStringObject.item == 'string' && data.queryStringObject.item.trim().length > 0
				? data.queryStringObject.item.trim()
				: false;
	if (email && menu) {
		// Get the token from the headers
		const token = typeof data.headers.token == 'string' ? data.headers.token : false;

		// Verify if the given token is valid for the email
		handlers._tokens.verifyToken(token, email, function(tokenIsValid) {
			if (tokenIsValid) {
				// Lookup the menu
				_data.read('menus', menu, function(err, data) {
					if (!err && data) {
						// Remove the hashed password from the user object before returning it to the requester
						delete data.hashedPassword;
						// If an item was declared, look at the item, if not, look at the menu instead
						if (itemKey) {
							// Check if the declared item key exists
							item = data[itemKey] ? data[itemKey] : false;
							if (item) {
								callback(200, item);
							} else {
								callback(404);
							}
						} else {
							callback(200, data);
						}
					} else {
						callback(404);
					}
				});
			} else {
				callback(403, { Error: 'Missing required token in headers, or token is invalid' });
			}
		});
	} else {
		callback(400, { Error: 'Missing required field(s)  or the content are incorrect' });
	}
};

// TODO change it to carts Checks=============================================

// Carts *****

handlers.carts = function(data, callback) {
	const acceptableMethods = [ 'post', 'get', 'put', 'delete' ];
	if (acceptableMethods.indexOf(data.method) > -1) {
		handlers._carts[data.method](data, callback);
	} else {
		callback(405);
	}
};

// Container for all carts methods
handlers._carts = {};

// Carts - post
// Required data: email, cartItem.id, cartItem.menu, cartItem.quantity
// Optional data: none

handlers._carts.post = function(data, callback) {
	// Validate the inputs
	const email =
			typeof data.payload.email == 'string' &&
			data.payload.email.trim().length > 0 &&
			helpers.emailCheck(data.payload.email)
				? data.payload.email.trim()
				: false,
		cartItemTest = typeof data.payload.cartItem == 'object' ? true : false;

	if (email && cartItemTest) {
		const cartItem =
			typeof data.payload.cartItem.id == 'string' &&
			data.payload.cartItem.id.trim().length > 0 &&
			typeof data.payload.cartItem.menu == 'string' &&
			data.payload.cartItem.menu.trim().length > 0 &&
			typeof data.payload.cartItem.quantity == 'number' &&
			data.payload.cartItem.quantity > 0
				? data.payload.cartItem
				: false;
		if (cartItem) {
			// Get the menu item from the menu file
			const testMenu =
				typeof data.payload.cartItem.menu == 'string' && data.payload.cartItem.menu.trim().length > 0
					? data.payload.cartItem.menu.trim()
					: false;
			//Check menu file exits
			// Lookup the menu
			_data.read('menus', testMenu, function(err, testData) {
				if (!err && testData) {
					// Validate data
					const itemOnMenu = testMenu[data.payload.cartItem.id.trim()];
					// Verify content of cartItem
					if (itemOnMenu) {
						// Get the token from the headers
						const token = typeof data.headers.token == 'string' ? data.headers.token : false;

						// Lookup the user by reading the token
						_data.read('tokens', token, function(err, tokenData) {
							if (!err && tokenData) {
								const userEmail = tokenData.email;
								// Look up the user data
								_data.read('users', userEmail, function(err, userData) {
									if (!err && userData) {
										const userCarts =
											typeof userData.carts == 'object' && userData.carts instanceof Array ? userData.carts : [];
										// Verify if the user has less than the number of max-carts-per-user
										if (userCarts.length < config.maxCarts) {
											// Create a random id for the cart
											const cartId = helpers.createRandomString(20);

											// Create the cart object, and include the users email
											const cartObject = {
												id: cartId,
												userEmail: userEmail,
												items: {
													[cartItem.id]: {
														quantity: cartItem.quantity,
														id: cartItem.id,
														menu: cartItem.menu
													}
												}
											};

											// Save the object
											_data.create('carts', cartId, cartObject, function(err) {
												if (!err) {
													// Add the cart to the user's object
													userData.carts = userCarts;
													userData.carts.push(cartId);

													// Save the new user data
													_data.update('users', userEmail, userData, function(err) {
														if (!err) {
															//Return the data about the new cart
															callback(200, cartObject);
														} else {
															callback(500, { Error: 'Could not update the user with the new cart' });
														}
													});
												} else {
													callback(500, { Error: 'Could not create the new cart' });
												}
											});
										} else {
											callback(400, { Error: `The user already have the maximum number of carts ${config.maxCarts}` });
										}
									} else {
										callback(403);
									}
								});
							} else {
								callback(403);
							}
						});
					} else {
						callback(400, {
							Error: `The item '${data.payload.cartItem.id.trim()}' doesn't exists on menu '${testMenu}'`
						});
					}
				} else {
					callback(400, { Error: `The menu '${testMenu}' on item doesn't exists` });
				}
			});
		} else {
			callback(400, { Error: 'Cart Item content is missing' });
		}
	} else {
		callback(400, { Error: 'Missing required inputs, or inputs are invalid' });
	}
};

//TODO Carts - get
// Required data: id
// Optional data: none
handlers._carts.get = function(data, callback) {
	// Check that the id is valid
	const id =
		typeof data.queryStringObject.id == 'string' && data.queryStringObject.id.trim().length == 20
			? data.queryStringObject.id.trim()
			: false;
	if (id) {
		// Lookup the cart
		_data.read('carts', id, function(err, cartData) {
			if (!err && cartData) {
				// Get the token from the headers
				const token = typeof data.headers.token == 'string' ? data.headers.token : false;

				// Verify if the given token is valid and belongs to the user who created the cart
				handlers._tokens.verifyToken(token, cartData.userEmail, function(tokenIsValid) {
					if (tokenIsValid) {
						// Return the cart data
						callback(200, cartData);
					} else {
						callback(403);
					}
				});
			} else {
				callback(404);
			}
		});
	} else {
		callback(400, { Error: 'Missing required field' });
	}
};

//TODO Carts - put
// Required data: id
// Optional data: protocol, url, method, successCodes, timeoutSeconds (one must be sent)
handlers._carts.put = function(data, callback) {
	// Check for the required field
	const id = typeof data.payload.id == 'string' && data.payload.id.trim().length == 20 ? data.payload.id.trim() : false;
	// Check for the optional fields
	const protocol =
			typeof data.payload.protocol == 'string' && [ 'https', 'http' ].indexOf(data.payload.protocol) > -1
				? data.payload.protocol
				: false,
		url = typeof data.payload.url == 'string' && data.payload.url.trim().length > 0 ? data.payload.url.trim() : false,
		method =
			typeof data.payload.method == 'string' && [ 'post', 'get', 'put', 'delete' ].indexOf(data.payload.method) > -1
				? data.payload.method
				: false,
		successCodes =
			typeof data.payload.successCodes == 'object' &&
			data.payload.successCodes instanceof Array &&
			data.payload.successCodes.length > 0
				? data.payload.successCodes
				: false,
		timeoutSeconds =
			typeof data.payload.timeoutSeconds == 'number' &&
			data.payload.timeoutSeconds % 1 === 0 &&
			data.payload.timeoutSeconds >= 1 &&
			data.payload.timeoutSeconds <= 5
				? data.payload.timeoutSeconds
				: false;

	//Check to make sure the id is valid
	if (id) {
		//Check to make sure one or more optional fields has been sent
		if (protocol || url || method || successCodes || timeoutSeconds) {
			// Lookup the cart
			_data.read('carts', id, function(err, cartData) {
				if (!err && cartData) {
					// Get the token from the headers
					const token = typeof data.headers.token == 'string' ? data.headers.token : false;

					// Verify if the given token is valid and belongs to the user who created the cart
					handlers._tokens.verifyToken(token, cartData.userEmail, function(tokenIsValid) {
						if (tokenIsValid) {
							// Update the cart where necessary
							if (protocol) {
								cartData.protocol = protocol;
							}
							if (url) {
								cartData.url = url;
							}
							if (method) {
								cartData.method = method;
							}
							if (successCodes) {
								cartData.successCodes = successCodes;
							}
							if (timeoutSeconds) {
								cartData.timeoutSeconds = timeoutSeconds;
							}

							// Store the new updates
							_data.update('carts', id, cartData, function(err) {
								if (!err) {
									callback(200);
								} else {
									callback(500, { Error: 'Could not update the cart' });
								}
							});
						} else {
							callback(403);
						}
					});
				} else {
					callback(400, { Error: 'Cart ID did not exist' });
				}
			});
		} else {
			callback(400, { Error: 'Missing missing fields to update' });
		}
	} else {
		callback(400, { Error: 'Missing required field' });
	}
};

//TODO Carts - delete
// Required data: id
// Optional data: none
handlers._carts.delete = function(data, callback) {
	// Check that the email is valid
	const id =
		typeof data.queryStringObject.id == 'string' && data.queryStringObject.id.trim().length == 20
			? data.queryStringObject.id.trim()
			: false;
	if (id) {
		// Lookup the cart
		_data.read('carts', id, function(err, cartData) {
			if (!err && cartData) {
				// Get the token from the headers
				const token = typeof data.headers.token == 'string' ? data.headers.token : false;

				// Verify if the given token is valid for the email
				handlers._tokens.verifyToken(token, cartData.userEmail, function(tokenIsValid) {
					if (tokenIsValid) {
						// Delete the cart data
						_data.delete('carts', id, function(err) {
							if (!err) {
								// Lookup the user
								_data.read('users', cartData.userEmail, function(err, userData) {
									if (!err && userData) {
										const userCarts =
											typeof userData.carts == 'object' && userData.carts instanceof Array ? userData.carts : [];
										// Remove the deleted cart from their list of carts
										const cartPosition = userCarts.indexOf(id);
										if (cartPosition > -1) {
											userCarts.splice(cartPosition, 1);
											// Re-save the user's data
											_data.update('users', cartData.userEmail, userData, function(err) {
												if (!err) {
													callback(200);
												} else {
													callback(500, { Error: 'Could not update the user' });
												}
											});
										} else {
											callback(500, { Error: 'Could not find the cart on the users object, so could not remove it' });
										}
									} else {
										callback(500, {
											Error:
												'Could not find the user who created the cart, co could not remove the cart from the list of carts on the user object'
										});
									}
								});
							} else {
								callback(500, { Error: 'Could not delete the cart data' });
							}
						});
					} else {
						callback(403);
					}
				});
			} else {
				callback(400, { Error: 'The specified cart ID does not exist' });
			}
		});
	} else {
		callback(400, { Error: 'Missing required field' });
	}
};

//========================

// Ping handler
handlers.ping = function(data, callback) {
	callback(200);
};

// Not found handler
handlers.notFound = function(data, callback) {
	callback(404);
};

// Export the module
module.exports = handlers;
