var app = angular.module('LibraryApp', [ 'ngMaterial' ]);
app
.controller(
		'AppCtrl',
		[
			'$scope',
			'$window',
			'$mdDialog',
			'$http',
			function($book, $window, $mdDialog, $http) {
				$book.defaultcontent = true;

				//To enable Add Book Button
				$book.enablebutton = function() {

					if (($book.id != null) && ($book.id != '')) {
						document.getElementById('id').style.boxShadow = '0 0 5px #2b8ad0';
						document.getElementById('id').style.border = '1px solid #2b8ad0';
					} else {
						document.getElementById('id').style.boxShadow = '0 0 5px rgb(255, 87, 34)';
						document.getElementById('id').style.border = '1px solid rgb(255, 87, 34)';
						$book.enable = false;
					}
					if (($book.title != null)
							&& ($book.title != '')) {
						document.getElementById('title').style.boxShadow = '0 0 5px #2b8ad0';
						document.getElementById('title').style.border = '1px solid #2b8ad0';
					} else {
						document.getElementById('title').style.boxShadow = '0 0 5px rgb(255, 87, 34)';
						document.getElementById('title').style.border = '1px solid rgb(255, 87, 34)';
						$book.enable = false;
					}
					if (($book.author != null)
							&& ($book.author != '')) {
						document.getElementById('author').style.boxShadow = '0 0 5px #2b8ad0';
						document.getElementById('author').style.border = '1px solid #2b8ad0';
					} else {
						document.getElementById('author').style.boxShadow = '0 0 5px rgb(255, 87, 34)';
						document.getElementById('author').style.border = '1px solid rgb(255, 87, 34)';
						$book.enable = false;
					}
					if (($book.price != null)
							&& ($book.price != '')) {
						document.getElementById('price').style.boxShadow = '0 0 5px #2b8ad0';
						document.getElementById('price').style.border = '1px solid #2b8ad0';
					} else {
						document.getElementById('price').style.boxShadow = '0 0 5px rgb(255, 87, 34)';
						document.getElementById('price').style.border = '1px solid rgb(255, 87, 34)';
						$book.enable = false;
					}
					if (($book.quantity != null)
							&& ($book.quantity != '')) {
						document.getElementById('quantity').style.boxShadow = '0 0 5px #2b8ad0';
						document.getElementById('quantity').style.border = '1px solid #2b8ad0';
					} else {
						document.getElementById('quantity').style.boxShadow = '0 0 5px rgb(255, 87, 34)';
						document.getElementById('quantity').style.border = '1px solid rgb(255, 87, 34)';
						$book.enable = false;
					}
					if ((angular.isDefined($book.id))
							&& ($book.id != null)
							&& ($book.id != '')
							&& ($book.title != '')
							&& ($book.author != '')
							&& ($book.price != '')
							&& ($book.quantity != '')
							&& ($book.title != null)
							&& ($book.author != null)
							&& ($book.price != null)
							&& ($book.quantity != null)) {
						console.log("Final Hello");

						$book.enable = true;
					}

				}

				// For Search Feature
				$book.query = {}
				$book.queryBy = '$'

					// For Show all books on load
					var load = {
						url : "webapi/myresource",
						method : "GET",
				};
				$http(load)
				.then(
						function(response) {
							var temp = [];
							temp = angular
							.fromJson(response.data);

							$book.list = temp;

							if (response.status == 200)
								console.log("Loading all books Successful! :)");
						},
						function(response) {
							console.log("Error Loading Books from DataBase :(");
						});

				// For Show Library History
				var history = {
						url : "webapi/myresource/history",
						method : "GET",
				};
				$http(history)
				.then(
						function(response) {
							var temp = [];
							temp = angular
							.fromJson(response.data);
							// console.log(response.data);
							$book.list2 = temp;

							if (response.status == 200)
								console.log("Loading Library History Successful! :)");
						},
						function(response) {
							console.log("Error Loading Library History from DataBase :(");
						});

				// Add Book Function
				$book.addbook = function(ev, index) {
					if ((angular.isDefined($book.id))
							&& ($book.id != '')
							&& ($book.title != '')
							&& ($book.author != '')
							&& ($book.price != '')
							&& ($book.quantity != '')
							&& ($book.id != null)
							&& ($book.title != null)
							&& ($book.author != null)
							&& ($book.price != null)
							&& ($book.quantity != null)) {

						var book = {
								author : $book.author,
								id : $book.id,
								price : $book.price,
								quantity : $book.quantity,
								title : $book.title
						};

						var req = {
								url : "webapi/myresource/create",
								method : "POST",
								data : JSON.stringify(book)
						};

						$http(req).then(function(response) {

							if (response.status == 200) {
								$book.list.push(book);
							}

						}, function(response) {
							$window.alert("Duplicate Entry!");
						});

						$book.id = '';
						$book.title = '';
						$book.author = '';
						$book.price = '';
						$book.quantity = '';
						$book.enable = false;

					} else {
						$book.showAlert(ev);
					}
				}

				// Delete Function
				$book.showConfirm = function(ev, index) {
					var confirm = $mdDialog.confirm().title(
					'Would you like to delete this book?')
					.targetEvent(ev).ok('Yes!')
					.cancel('No');

					$mdDialog
					.show(confirm)
					.then(
							function() {

								var req = {
										url : "webapi/myresource/delete/"
											+ $book.list[index].id,
											method : "DELETE",
								};

								$http(req)
								.then(
										function(
												response) {

											if (response.status == 200) {
												$window
												.alert("Delete Successful!");
											}

										},
										function(
												response) {
											$window
											.alert("Couldn't Delete!");
										});
								$book.list.splice(index, 1);
							}, function() {
							});
				};

				//Pop-up (Invalid Fields)
				$book.showAlert = function(ev) {
					$mdDialog
					.show($mdDialog
							.alert()
							.parent(
									angular
									.element(document
											.querySelector('#popupContainer')))
											.clickOutsideToClose(true)
											.title('Error!').textContent(
											'Check fields !').ok(
											'Got it!').targetEvent(
													ev));
				};

				//Pop-up (No Copies)
				$book.showAlert2 = function(ev) {
					$mdDialog
					.show($mdDialog
							.alert()
							.parent(
									angular
									.element(document
											.querySelector('#popupContainer')))
											.clickOutsideToClose(true)
											.title('Error!')
											.textContent(
											'Sorry!All copies of the book ran out !')
											.ok('Got it!').targetEvent(ev));
				};

				//Show Books Div
				$book.gotobookstab = function() {
					$book.defaultcontent = false;
					$book.bookstabcontent = true;
					$book.libraryhistorytab = false;
				}

				// Return Function
				$book.returnbook = function(ev, index) {
					$book.date = new Date();
					for (i = 0; i < $book.list.length; i++) {
						if ($book.list[i].id == $book.list2[index].bookid) {
							var ret = {
									url : "webapi/myresource/return/"
										+ $book.list2[index].bookid
										+ "/"
										+ $book.list2[index].custid,
										method : "POST",
							};

							$http(ret)
							.then(
									function(response) {

										if (response.status == 200) {

											$book.list2[index].return_date = $book.date;
											console
											.log($book.date);
											$window
											.alert("Return Successful!");
										}

									},
									function(response) {
										$window
										.alert("Couldn't Return!");
									});
							$book.list[i].quantity = $book.list[i].quantity + 1;
							break;
						}
					}
				}

				$book.gotolibraryhistorytab = function() {
					$book.defaultcontent = false;
					$book.bookstabcontent = false;
					$book.libraryhistorytab = true;
				}

				// Update Function
				$book.updatebook = function(index) {

					var req = {
							url : "webapi/myresource/update/"
								+ $book.list[index].id + "/"
								+ $book.list[index].title + "/"
								+ $book.list[index].author + "/"
								+ $book.list[index].price + "/"
								+ $book.list[index].quantity,
								method : "PUT"
					};
					if (($book.list[index].title != null)
							&& ($book.list[index].title != '')
							&& ($book.list[index].author != null)
							&& ($book.list[index].author != '')) {
						$http(req)
						.then(
								function(response) {
									$window
									.alert("Update Successful! :)");
								},
								function(response) {
									$window
									.alert("Sorry :(/nCouldn't Update!");
								});
					}
				}

				// Issue Book Function
				$book.showPrompt = function(ev, index) {

					var flag=0;
					var confirm = $mdDialog.prompt().title(
					'Please Enter your CustomerID')
					.placeholder('CustomerID :')
					.targetEvent(ev).required(true).ok(
					'Confirm!').cancel('Cancel');

					$mdDialog
					.show(confirm)
					.then(
							function(result) {
								$book.date = new Date();
								if ($book.list[index].quantity > 0) {
									for (i = 0; i < $book.list2.length; i++) {

										if (($book.list[index].id == $book.list2[i].bookid)
												&& ($book.list2[i].custid == result)
										){
											if($book.list2[i].return_date == null){$window
												.alert("You have currently issued this book!");}
											else
												$window.alert("You have issued this book in the past! ");
											flag=1;
											break;
										}
									}
									if(flag==0){

										var issue = {
												url : "webapi/myresource/issue/"
													+ $book.list[index].id
													+ "/"
													+ result,
													method : "POST",
										};

										$http(issue)
										.then(
												function(
														response) {

													if (response.status == 200) {

														$book.list2
														.push({
															bookid : $book.list[index].id,
															custid : result,
															title : $book.list[index].title,
															author : $book.list[index].author,
															price : $book.list[index].price,
															issue_date : $book.date
														});
														$book.list[index].quantity = $book.list[index].quantity - 1;
														$window
														.alert("Issue Successful!");
													}

												},
												function(
														response) {
													$window
													.alert("Couldn't Issue!");
												});

									}

								} else {
									$book.showAlert2(ev);
								}
							}, function() {
							});
				};
			} ]);
