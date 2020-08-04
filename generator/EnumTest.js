const EnumTest = {
  FIRST: "first",
  SECOND: "second",
  THIRD: "third",
  FOURTH: "fourth",
};

EnumTest.properties = 
{
  "first": {
    "name": "First",
    "value": 1,
    "key": "first"
  },
  "second": {
    "name": "Second",
    "value": 2,
    "key": "second"
  },
  "third": {
    "name": "Third",
    "value": 3,
    "key": "third"
  },
  "fourth": {
    "name": "Fourth",
    "value": 4,
    "key": "fourth"
  }
};

EnumTest.keys = () => Object.keys(EnumTest.properties);

EnumTest.values = () => Object.values(EnumTest.properties);

Object.freeze(EnumTest);

export default EnumTest;