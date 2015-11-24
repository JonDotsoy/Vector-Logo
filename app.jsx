import React from "react";
import ReactDOM from "react-dom";
import jQuery from "jquery";


var LoadingAnimation = React.createClass({
	getInitialState: function () {
		return {
			textLoading: "loading",
			textPunter: "",
		};
	},
	componentWillMount: function () {
		this.interval = setInterval(() => {
			this.counter++;
			if (this.counter > 3) {
				this.counter = 0;
			}
			this.setState({
				textPunter: ".".repeat(this.counter),
			});
		}, this.props.speed||500);
	},
	componentWillUnmount: function () {
		clearInterval(this.interval);
	},
	interval: null,
	counter: 0,
	render: function() {
		return (
			<div className="LoadingAnimation">{this.state.textLoading}{this.state.textPunter}</div>
		);
	}
});


var BtnDefault = React.createClass({
	getInitialState: function () {
		return {
			hover: false,
			style: {
				"border": "solid 1px #BDBDBD",
				"padding": "8px 15px",
				"backgroundColor": "#F0F0F0",
				"color": "black",
				"borderRadius": "3px",
				"outline": "none",
				"textDecoration": "none",
			},
			styleHover: {
				"border": "solid 1px #BDBDBD",
				"padding": "8px 15px",
				"backgroundColor": "#EAEAEA",
				"color": "black",
				"borderRadius": "3px",
				"boxShadow": "0px 1px 2px #E6E6E6",
				"outline": "none",
				"textDecoration": "none",
			},
		};
	},
	toggleHover: function (action = !this.state.hover) {
		this.setState({hover: action});
	},
	render: function() {
		let styles = (this.state.hover) ? this.state.styleHover: this.state.style;

		if (this.props.href) {
			return (<a target={this.props.target} onFocus={this.toggleHover.bind(this, true)} onBlur={this.toggleHover.bind(this, false)} onMouseEnter={this.toggleHover.bind(this, true)} onMouseLeave={this.toggleHover.bind(this, false)} style={styles} href={this.props.href}>{this.props.children}</a>);
		} else {
			return (<button onFocus={this.toggleHover.bind(this, true)} onBlur={this.toggleHover.bind(this, false)} onMouseEnter={this.toggleHover.bind(this, true)} onMouseLeave={this.toggleHover.bind(this, false)} style={styles} onClick={this.props.onClick}>{this.props.children}</button>);
		}
	}
});


var ItemImage = React.createClass({
	getInitialState: function () {
		return {
			data: this.props.data,
			href: null,
		};
	},
	downloadByUR: function (url) {
		let href = "";
		jQuery.ajax({
			url,
			dataType: "text",
			cache: true,
		})
		.done((data) => {
			href = `data:image/svg+xml;base64,${btoa(data)}`;
			this.setState({href: href});
		});
	},
	render: function() {
		let visorImage = null;

		if (this.state.href == null) {
			this.downloadByUR(this.props.data.img_down);
			// href = `http://lorempixel.com/${Math.floor(100+(Math.random()*300))}/${Math.floor(50+(Math.random()*600))}/business/1/`;

			visorImage = <div style={{
				"textAlign": "center",
				"backgroundColor": "#E4E4E4",
				"border": "solid 1px #D0D0D0",
			}}><LoadingAnimation></LoadingAnimation></div>
		} else {
			visorImage = <div style={{
				"backgroundImage": "url(data:image/gif;base64,R0lGODlhCgAKAIAAAOXl5f///yH5BAAAAAAALAAAAAAKAAoAAAIRhB2ZhxoM3GMSykqd1VltzxQAOw==)",
				"padding": "10px",
				"margin": "0px",
				"textAlign": "center",
			}}>
				<img style={{
					"maxWidth": "250px",
				}} src={this.state.href} alt="Images"/>
			</div>;
		}

		return (
			<div className="ItemImage" style={{
				padding: "0px 0px 0px 0px",
			}}>

				{/*Image Container*/}
				<div style={{
					"padding": "5px",
				}} className="image-container">
					{visorImage}
				</div>

				{/* Title Container */}
				<div style={{
					"paddingLeft": "10px",
					"paddingRight": "10px",
					"paddingTop": "5px",
					"paddingBottom": "5px",
				}}>{this.state.data.title}</div>

				{/* btn to view */}
				<div style={{
					"textAlign": "center",
					"padding": "0px 0px 20px 0px",
				}}>
					<BtnDefault target="_black" href={this.state.data.href}>Abrir{" "}<i className="mdi mdi-open-in-new"></i></BtnDefault>
				</div>

			</div>
		);
	}
});


var ImagesContainer = React.createClass({
	getInitialState: function () {
		/*
			{
		    "name": "AJAX",
		    "path": "Logos/AJAX",
		    "sha": "699c77a49fdf101c122c7daba08a4b7e4967252b",
		    "size": 0,
		    "url": "https://api.github.com/repos/JonDotsoy/Vector-Logo/contents/Logos/AJAX?ref=master",
		    "html_url": "https://github.com/JonDotsoy/Vector-Logo/tree/master/Logos/AJAX",
		    "git_url": "https://api.github.com/repos/JonDotsoy/Vector-Logo/git/trees/699c77a49fdf101c122c7daba08a4b7e4967252b",
		    "download_url": null,
		    "type": "dir",
		    "_links": {
		      "self": "https://api.github.com/repos/JonDotsoy/Vector-Logo/contents/Logos/AJAX?ref=master",
		      "git": "https://api.github.com/repos/JonDotsoy/Vector-Logo/git/trees/699c77a49fdf101c122c7daba08a4b7e4967252b",
		      "html": "https://github.com/JonDotsoy/Vector-Logo/tree/master/Logos/AJAX"
		    }
		  },
		*/

		return {
			images: [],
      B: {
        "config": {
          "url": "https://api.github.com/repos/jonDotsoy/Vector-Logo/contents/Logos?ref=master",
          "client_id": "784e57ecd6de3e5c7243",
          "client_secret": "7601000f401dab186f7c6e32038bc4446d8e2277",
        },
        "storage": {
          "folders": [],
          "files": [],
        },
      },
      filterText: "",
		};
	},
	changeFilter: function (event) {
		this.setState({
			filterText: event.target.value,
		});
	},
	addFile: function (dataByGithubapi) {
		// img_down
		// title
		// href
		let {download_url:img_down, name:title, html_url:href, sha} = dataByGithubapi;
		// console.log(dataByGithubapi);
		this.state.images.push({img_down, title, href, sha});
		this.setState({images: this.state.images});
	},
	componentWillMount: function () {
		this.scanDir();
	},
	scanDir: function (url = this.state.B.config.url) {
		jQuery.ajax({
			"url": url,
			"cache": true,
			"dataType": "json",
			"async": true,
			"data": {
				"client_id": this.state.B.config.client_id,
				"client_secret": this.state.B.config.client_secret,
			},
			"headers": {},
			"method": "GET",
		})
		.done((data) => {
			// {
			//   "name": "AJAX",
			//   "path": "Logos/AJAX",
			//   "sha": "699c77a49fdf101c122c7daba08a4b7e4967252b",
			//   "size": 0,
			//   "url": "https://api.github.com/repos/JonDotsoy/Vector-Logo/contents/Logos/AJAX?ref=master",
			//   "html_url": "https://github.com/JonDotsoy/Vector-Logo/tree/master/Logos/AJAX",
			//   "git_url": "https://api.github.com/repos/JonDotsoy/Vector-Logo/git/trees/699c77a49fdf101c122c7daba08a4b7e4967252b",
			//   "download_url": null,
			//   "type": "dir",
			//   "_links": {
			//     "self": "https://api.github.com/repos/JonDotsoy/Vector-Logo/contents/Logos/AJAX?ref=master",
			//     "git": "https://api.github.com/repos/JonDotsoy/Vector-Logo/git/trees/699c77a49fdf101c122c7daba08a4b7e4967252b",
			//     "html": "https://github.com/JonDotsoy/Vector-Logo/tree/master/Logos/AJAX"
			//   }
			// }
			for (let dat of data) {
				let {type, url} = dat;
				switch (type) {
					case "dir":
						this.scanDir(url);
						break;
					case "file":
						this.addFile(dat);
						break;
				}
			}
		})
		;
	},
	render: function() {
		let imageBox = null;

		if (this.state.images == null || this.state.images.length == 0) {
			imageBox = (<div>
				<div style={{
								"color": "#BDBDBD",
							}}>[Cargando Imagenes]</div>
				<div style={{
					"textAlign": "center",
				}}>
					<LoadingAnimation></LoadingAnimation>
				</div>
			</div>);
		} else {
			imageBox = this.state.images.map((image, indexImage) => {
				// Filter by type
				if (image.title.toLocaleLowerCase().search(/\.svg$/) == -1) {
					return null;
				}


				if (this.state.filterText != ""){
					if (image.title.toLocaleLowerCase().indexOf(this.state.filterText.toLocaleLowerCase()) == -1) {
						return null;
					}
				}

				return (<div key={image.sha} style={{
					"display": "inline-block",
					"minWidth": "250px",
					"width": "auto",
					"vertical-align": "top",
				}}>
					<ItemImage data={image}></ItemImage>
				</div>);
			});
		}

		return (
			<div className="ImagesContainer">
				{/*Filter*/}
				<div style={{
					"padding": "20px",
				}}>
					<div style={{
					}}>
						<input type="text" onChange={this.changeFilter} autocomplete="off" style={{
							"width": "100%",
						}}/>
					</div>
				</div>

				<div style={{
					"display": "flex",
					"flexWrap": "wrap",
					"flexDirection": "row",
					"justifyContent": "space-around",
					"alignItems": "flex-start",
					"paddingBottom": "20px",
				}}>
					{/*Images*/}
					{imageBox}
				</div>
			</div>
		);
	}
});


let AppView = React.createClass({
	render: function() {
		return (
			<div className="AppView">
				<div style={{
					"margin": "auto",
					"maxWidth": "900px",
					"fontSize": "1rem",
					"backgroundColor": "#F9F9F9",
				}}>

					<div style={{
						"padding": "20px",
					}}>

						{/* header Top */}

						<div style={{
							"padding": "20px 0px",
						}} className="navbar">
							<div style={{
								"display": "flex",
							}}>
								<div style={{
									"flex": "1",
								}}>
									<div style={{
										"fontSize": "1.2rem",
										"display": "inline",
										"fontWeight": "bold",
										"textTransform": "uppercase",
									}}>Vector-Logo</div>
								</div>
								<div>
									<BtnDefault href="https://github.com/jonDotsoy/vector-logo">
										<i className="mdi mdi-github-circle"></i> Star
									</BtnDefault>
								</div>
							</div>
						</div>

					</div>

				{/* Container Images */}
				<ImagesContainer></ImagesContainer>

				</div>
			</div>
		);
	}
});


ReactDOM.render(<AppView />, document.getElementById("app"));
