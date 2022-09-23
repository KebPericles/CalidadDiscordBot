const MemeExample = require('./memeExample.js');

module.exports = class MemeTemplate {
	/**
	* @type {String}
	*/
	id;

	/**
	* @type {String}
	*/
	name;

	/**
	* @type {Number}
	*/
	lines;

	/**
	* @type {Number}
	*/
	overlays;

	/**
	* @type {Array<String>}
	*/
	styles;

    /**
	* @type {String}
	*/
	blank;

    /**
	* @type {MemeExample}
	*/
	example;

    /**
	* @type {String}
	*/
	source;

    /**
	* @type {String}
	*/
	_self;
}