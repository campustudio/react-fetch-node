import React from 'react';
import PropTypes from 'prop-types';

export default class ObjectCreator extends React.Component {
  constructor(props) {
    super(props)

    this.state = {

    }
  }

  componentDidMount() {
    // this.testConstructor()
    // this.testCreate()
    // this.testExtend()
    // this.testProps()
    // this.testProto()
    this.testClosure1()
    // this.testClosure2()
  }

  testConstructor() {
    function Phone(brand) {
      this.brand = brand
    }
    let nokia = new Phone('Nokia')
    console.log('nokia.constructor: ', nokia.constructor);
    console.log('nokia.constructor.prototype: ', nokia.constructor.prototype); 
    console.log('nokia.constructor.prototype.constructor: ', nokia.constructor.prototype.constructor);
    console.log(nokia.constructor === Phone); // => true
    console.log(nokia.constructor.prototype === Phone.prototype); // => true
    console.log('Phone.prototype: ', Phone.prototype);
    console.log('Phone.prototype.__proto__: ', Phone.prototype.__proto__);
    console.log(Phone.prototype.__proto__ === Object.prototype); // true => the final relationship between Phone() and Object()
    console.log('Object.prototype.__proto__: ', Object.prototype.__proto__); // null

    function Smartphone(model) {
      this.model = model
    }
    let iphone8 = new Smartphone('iphone8')
    console.log(iphone8.constructor === Smartphone); // => true

    Smartphone.prototype = new Phone('Huawei') // 1
    // Smartphone.prototype = Phone.prototype // 2
    let honor = new Smartphone('honor')
    console.log('honor.brand: ', honor.brand);
    console.log('honor.model: ', honor.model);
    console.log(honor.constructor === Smartphone); // => false
    console.log(honor.constructor === Phone); // => true
    console.log('iphone8: ', iphone8);
    console.log('honor: ', honor);

    let ironman = {name: 'Tony Stark'}
    console.log('ironman.constructor.prototype: ', ironman.constructor.prototype);
    console.log(ironman.constructor === Object) // => true
    console.log(ironman.constructor.prototype === Object.prototype) // => true
    console.log('ironman: ', ironman);
  }

  testCreate() {
    // 1.建立一个原型为null的对象
    let spiderman = Object.create(null, {
      props: {
        name: 'Peter Park'
      }
    });
    console.log('spiderman.constructor: ', spiderman.constructor); // => undefined

    // 2.创建一个原型为Array的对象
    let array = Object.create(Array.prototype, {});
    console.log('array.constructor: ', array.constructor); // => Array()
    console.log('array.constructor.prototype: ', array.constructor.prototype); // => [constructor: ƒ, ...]

    // 3.创建一个原型为自定义类的对象
    function Car() {
      this.fix = function() {
        console.log('going to fix');
      }
    }
    let audi = Object.create(Car.prototype, {});
    audi.ov = '3.0T'
    Car.prototype.charge = function() {
      console.log('going to charge');
    }
    console.log('audi.constructor: ', audi.constructor); // Car()
    console.log('audi.constructor.prototype: ', audi.constructor.prototype); // {charge: ƒ, constructor: ƒ}
    console.log('audi: ', audi);

    /**
     * another constructor
     * @param {*} type 
     */
    function Machine(type) {
      this.type = type
      this.fly = function() {
        console.log('going to fly1');
      }
    }
    Machine.prototype.run = function() {
      console.log('going to run');
    }
    Machine.prototype.fly = function() {
      console.log('going to fly2');
    }

    /**
     * compare diff creators
     */
    let benz1 = new Car() // 1
    console.log('benz1.fix: ', benz1.fix()); // notice this is diff from below bmw1.fix
    console.log('benz1.charge: ', benz1.charge());

    let bmw1 = Object.create(Car.prototype, {}); // 2
    console.log('bmw1.constructor: ', bmw1.constructor);
    console.log('bmw1.constructor.prototype: ', bmw1.constructor.prototype);
    console.log('bmw1.charge: ', bmw1.charge());
    // console.log('bmw1.fix: ', bmw1.fix()); // error

    /**
     * cover prototype(also 2 diff ways)
     */
    // Car.prototype = new Machine('car') // 1
    Car.prototype = Machine.prototype // 2
    let bmw2 = Object.create(Car.prototype, {});
    console.log('bmw2.constructor: ', bmw2.constructor);
    console.log('bmw2.constructor.prototype: ', bmw2.constructor.prototype);
    console.log('bmw2.type: ', bmw2.type);
    console.log('bmw2.fly: ', bmw2.fly()); // 1 diff from 2 
    console.log('bmw2.run: ', bmw2.run());
  }

  testExtend() {
    function Phone(brand) {
      this.brand = brand
      this.online = function() {
        console.log(brand + ' is going to online');
      }
    }
    let nokia = new Phone('Nokia')
    console.log('brand of nokia: ', nokia.brand);
    console.log('__proto__ of nokia: ', nokia.__proto__);
    console.log(nokia.__proto__ === nokia.constructor.prototype); // true => 对象的__proto__即是其构造器的prototype
    console.log(nokia.constructor.prototype.__proto__ === Object.prototype); // true
    console.log(nokia.__proto__.__proto__ === Object.prototype); // true
    console.log('prototype of nokia: ', nokia.prototype); // undefined => 可再次看出prototype是构造器层面的属性
    nokia.online();
    Phone.prototype.onMsg = function() {
      console.log('nokia message coming');
    }
    nokia.onMsg();

    function Smartphone(model) {
      this.model = model
      this.oncalling = function() {
        console.log(model + ' is on calling');
      }
    }
    let iphone8 = new Smartphone('iphone8')
    console.log('model of iphone8: ', iphone8.model);
    iphone8.oncalling();

    console.log('brand of iphone8: ', iphone8.brand);
    console.log('Phone.prototype: ', Phone.prototype);
    console.log('Smartphone.prototype: ', Smartphone.prototype);

    /**
     * 继承方式之一
     */
    Smartphone.prototype = new Phone('Xiaomi') // 继承Phone对象实例的所有成员，静态成员除外

    console.log('Smartphone.prototype: ', Smartphone.prototype);
    console.log('Smartphone.prototype.__proto__: ', Smartphone.prototype.__proto__);
    let iphoneX = new Smartphone('iphoneX')
    console.log('brand of iphoneX: ', iphoneX.brand);
    console.log('model of iphoneX: ', iphoneX.model);
    iphoneX.online();
    iphoneX.onMsg();
    iphoneX.oncalling();
  }

  testProps() {
    /**
     * this关键字
     */
    // 在创建对象的构造函数、方法成员中，this指向为实例对象本身
    var o = {
      x: 1,
      y: 2,
      sayHello: function () {
        console.log(this.x); // => 1：读取实例对象属性x的值
        // console.log(x); // => 报错：读取的是变量x
      }
    };
    o.sayHello();

    /**
     * 实例成员
     */
    // 1.在创建对象方式中，对this进行操作
    function People(name) {
      this.name = name;
    }
    var p = new People('tom');
    console.log(p.name); // => tom ：读取实例属性name的值
    console.log(p.__proto__ === People.prototype);

    // 2.在类的原型对象中进行扩展操作
    People.prototype.sayHello = function () {
      console.log('Hello: ' + this.name);
    }
    p.sayHello(); // => 弹出 Hello: tom

    /**
     * 静态成员
     */
    function PeopleX(name) {
      this.name = name;
    }
    // 给类添加一个静态成员hasName：判断PeopleX实例是否含有name属性
    PeopleX.hasName = function (px) {
      if (px.name && px.name.length > 0) {
        return true;
      }
      return false;
    }
    
    var px = new PeopleX('jerry');
    PeopleX.hasName(px) && console.log('px has name'); // => true
  }

  testProto() {
    function Ball(name) {
      this.name = name;
      this.showName = function() {
        console.log('I am ' + this.name + ' from this'); 
      }
    }
    Ball.prototype.showName = function() {
      console.log('I am ' + this.name + ' from prototype'); 
    }
    let football = new Ball("football");
    football.showName = function() {
      console.log('I am ' + this.name + ' from football'); 
    }
    football.fly(); // football is flying
    football.showName(); // I am football from this
  }

  testClosure1() {
    var name = "The Window";

　　 var object = {
　　　　name : "My Object",

　　　　getNameFunc : function(){
　　　　　　return function(){
　　　　　　　　return this;
　　　　　　};
　　　　}
　　};

　　console.log(object.getNameFunc()()); // undefined but在控制台中演示此段代码，输出的是The Window
    // 相当于？
　　console.log(function(){return this}()); // undefined
  }

  testClosure2() {
    var name = "The Window";

　　 var object = {
　　　　name : "My Object",

　　　　getNameFunc : function(){
          var that = this;
　　　　　　return function(){
　　　　　　　　return that.name;
　　　　　　};
　　　　}
　　};

　　console.log(object.getNameFunc()()); // My Object
  }

  render() {
    return (
      <section>
        <input id='my-car' list='cars'/>
        <datalist id='cars'>
          <option value="BMW"/>
          <option value="Ford"/>
          <option value="Volvo"/>
        </datalist>
      </section>
    );
  }
}

ObjectCreator.defaultProps = {

}

ObjectCreator.propTypes = {

}