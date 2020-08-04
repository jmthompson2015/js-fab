import EnumTest from "./EnumTest.js";

QUnit.module("EnumTest");

QUnit.test("EnumTest properties First", (assert) => {
  const key = EnumTest.FIRST;
  const properties = EnumTest.properties[key];
  assert.equal(properties.name, "First");
  assert.equal(properties.value, 1);
  assert.equal(properties.key, key);
});

QUnit.test("EnumTest properties Fourth", (assert) => {
  const key = EnumTest.FOURTH;
  const properties = EnumTest.properties[key];
  assert.equal(properties.name, "Fourth");
  assert.equal(properties.value, 4);
  assert.equal(properties.key, key);
});

QUnit.test("keys and values", (assert) => {
  // Run.
  const result = EnumTest.keys();
  const ownPropertyNames = Object.getOwnPropertyNames(EnumTest);

  // Verify.
  ownPropertyNames.forEach((key) => {
    const key2 = EnumTest[key];

    if (key !== "properties" && typeof key2 === "string") {
      assert.ok(EnumTest.properties[key2], `Missing value for key = ${key}`);
    }
  });

  result.forEach((value) => {
    const p = ownPropertyNames.filter((key) => EnumTest[key] === value);
    assert.equal(p.length, 1, `Missing key for value = ${value}`);
  });
});

QUnit.test("EnumTest.keys()", (assert) => {
  // Run.
  const result = EnumTest.keys();

  // Verify.
  assert.ok(result);
  const length = 4;
  assert.equal(result.length, length);
  assert.equal(R.head(result), EnumTest.FIRST);
  assert.equal(R.last(result), EnumTest.FOURTH);
  assert.ok(!result[length]);
});

const EnumTestTest = {};
export default EnumTestTest;
