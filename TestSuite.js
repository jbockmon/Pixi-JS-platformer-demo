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
        it('Should have rederer view object succefully defined', function(){
            expect(renderer.view).not.to.equal(undefined);
        });
    });
    describe('Game Engine: ',function(){
       describe('Keyboard', function(){
           xit("Should be defined", function(){
               //expect(key).
           });
           //expect(setup()).to.be.called();
       });
    });
    describe('Level Loading', function(){
        describe('Background', function(){
            it('Should be defined', function(){
               expect(bgBack).not.to.equal(undefined);
                expect(bgFront).not.to.equal(undefined);
            });
            it('Should be set at origin x = 0 y = 0', function(){
                expect(bgBack.position.x).to.equal(0);
                expect(bgBack.position.y).to.equal(0);
                expect(bgFront.position.x).to.equal(0);
                expect(bgFront.position.y).to.equal(0);
                
            });
        });
        describe('Stage', function(){
            it('Should have 3 items added',function(){
                expect(stage.children).to.have.lengthOf(3);
            });
        });
        describe('Global Variables', function(){
            it('Should have 3 items added',function(){
                expect(stage.children).to.have.lengthOf(3);
            });
        });
        describe('Player Sprite', function(){
            it('Should be defined', function(){
                expect(playerSprite).not.to.equal(undefined);
            });
            xit('Should have Speed defined', function(){
                expect(playerMoveSpeed).not.to.equal(undefined);
            });
            xit('Should have gravity defined', function(){
                expect(playerGravity).not.to.equal(undefined);
            });
            xit('Should have jump height defined', function(){
                expect(playerJumpHeight).not.to.equal(undefined);
            });
            it('Should have initial x velocity of 0', function(){
                expect(playerSprite.vx).to.equal(0);
            });
            it('Should have initial y velocity of 0', function(){
                expect(playerSprite.vy).to.equal(0);
            });
            
        });
    });
    describe('Runtime',function(){
        describe('Collisions',function(){
            xit('Should set player vy to 0 with horizantal collision', function(){
                //expect
            });
            xit('Should set player vx to 0 with floor collision', function(){
                //expect
            });
            xit('Should set player vy to 0 with horizantal collision', function(){
                //expect
            });
        });
    });
}());