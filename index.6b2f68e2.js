function e(e,t,n,r){Object.defineProperty(e,t,{get:n,set:r,enumerable:!0,configurable:!0})}var t="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},n={},r={},o=t.parcelRequire44c6;null==o&&((o=function(e){if(e in n)return n[e].exports;if(e in r){var t=r[e];delete r[e];var o={id:e,exports:{}};return n[e]=o,t.call(o.exports,o,o.exports),o.exports}var i=Error("Cannot find module '"+e+"'");throw i.code="MODULE_NOT_FOUND",i}).register=function(e,t){r[e]=t},t.parcelRequire44c6=o),o.register("fCemW",function(t,n){"use strict";e(t.exports,"register",()=>r,e=>r=e),e(t.exports,"resolve",()=>o,e=>o=e);var r,o,i={};r=function(e){for(var t=Object.keys(e),n=0;n<t.length;n++)i[t[n]]=e[t[n]]},o=function(e){var t=i[e];if(null==t)throw Error("Could not resolve bundle with id "+e);return t}}),o("fCemW").register(JSON.parse('{"2BF4I":"index.6b2f68e2.js","lKafR":"background2.fe5ecc78.jpg"}'));var i={};i=new URL(o("fCemW").resolve("lKafR"),import.meta.url).toString();const a=new Phaser.Class({Extends:Phaser.Scene,initialize:function(){Phaser.Scene.call(this,{key:"gameScene"})},preload(){},create(){},update(){}}),l={type:Phaser.AUTO,width:1280,height:720,scene:[{preload:function(){var e;this.load.image("background",(e=i)&&e.__esModule?e.default:e)},create:function(){this.add.image(700,250,"background"),this.add.text(460,300,"Новая игра",{fill:"#0f0"}).setInteractive().on("pointerdown",(function(){console.log("Игра начинается..."),this.scene.start("gameScene")}).bind(this)),this.add.text(660,300,"Выбор уровня",{fill:"#0f0"}).setInteractive().on("pointerdown",()=>void console.log("Открытие настроек...")),this.add.text(890,300,"Авторы",{fill:"#0f0"}).setInteractive().on("pointerdown",()=>void console.log("Открытие настроек..."))}},a]};new Phaser.Game(l);
//# sourceMappingURL=index.6b2f68e2.js.map
