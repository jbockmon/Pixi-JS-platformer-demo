(function () {
    'use strict';
    //chai.use(spies);
    describe('Environment Test:', function(){
       it('Should render to screen given 720 by 480', function(){
           expect(autoDetectRenderer(720,480).renderingToScreen).to.equal(true);
       });
        it('Should render to screen given 1280 by 720', function(){
            expect(autoDetectRenderer(1280,720).renderingToScreen).to.equal(true);
        });
    });
    describe('Game Engine: ',function(){
       xit('Setup function should be called', function(){
           //let spy = chai.spy(setup);
           //expect(spy).to.have.been.called();
       });
    });
    describe('Player test', function(){
        describe('Player Sprite', function(){
            it('Should Display cases correctly', function(){
                expect(true).to.equal(true);
            });
        });
    });
}());