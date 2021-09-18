class Visibility {
    visible = true;
    setVisible(visible: boolean) {
        this.visible = visible;
    }
}

// check typescript option to use noImplicitOverride: true to mark override members
class MockVisisbility extends Visibility {
    override setVisible(visible: boolean) {
        console.log(visible ? 'Shown' : 'Hidden');
    }
}

// app code
const real = new Visibility();
real.setVisible(true);
real.setVisible(false);

// test code
const mock = new MockVisisbility();
mock.setVisible(true);
mock.setVisible(false);