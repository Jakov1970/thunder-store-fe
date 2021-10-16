import {confirmPasswordValidator,emailValidator,passwordValidator,nameAndSurnameValidator} from '../../utils/validators'



describe('confirmPasswordValidator', () => {
    test('Match password and confirm password are diffrent',()=>{
        expect(confirmPasswordValidator('jakov','jovan').isValid).not.toBe(true);
    })
    test('Match password and confirm password are the same',()=>{
        expect(confirmPasswordValidator('jakov','jakov').isValid).toBe(true);
    })
});  

describe('emailValidator', () => {
    test('Email have whitespace',()=>{
        expect(emailValidator('jakov ').isValid).toBe(false);
    })
    test('Match password and confirm password are the same',()=>{
        expect(emailValidator(' ').isValid).toBe(false);
    })
    test('Match password and confirm password are the same',()=>{
        expect(emailValidator('@@@@@').isValid).toBe(false);
    })
    test('Match password and confirm password are the same',()=>{
        expect(emailValidator('..........@').isValid).toBe(false);
    })
    test('Match password and confirm password are the same',()=>{
        expect(emailValidator('AAAAAAA').isValid).toBe(false);
    })
    test('Match password and confirm password are the same',()=>{
        expect(emailValidator('123455').isValid).toBe(false);
    })
    test('Match password and confirm password are the same',()=>{
        expect(emailValidator('@!').isValid).toBe(false);
    })
    test('Match password and confirm password are the same',()=>{
        expect(emailValidator('@#').isValid).toBe(false);
    })
    test('Match password and confirm password are the same',()=>{
        expect(emailValidator('@%').isValid).toBe(false);
    })
    test('Match password and confirm password are the same',()=>{
        expect(emailValidator('@^').isValid).toBe(false);
    })
    test('Match password and confirm password are the same',()=>{
        expect(emailValidator('@&').isValid).toBe(false);
    })
    test('Match password and confirm password are the same',()=>{
        expect(emailValidator('@*').isValid).toBe(false);
    })
    test('Match password and confirm password are the same',()=>{
        expect(emailValidator('@*')).toBe({ value:'@*', isValid: false , message: "Please enter valid email."});
    })
  });

  describe('passwordValidator', () => {
    test('Check password validation',()=>{
        expect(passwordValidator('Jakov123').isValid).toBe(true);
    })
    test('Check password validation',()=>{
        expect(passwordValidator('jakov123').isValid).toBe(false);
    })
    test('Check password validation',()=>{
        expect(passwordValidator('Jakov123aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa').isValid).toBe(false);
    })
    test('Check password validation',()=>{
        expect(passwordValidator('Jakovaaa').isValid).toBe(false);
    })
    test('Check password validation',()=>{
        expect(passwordValidator('a').isValid).toBe(false);
    })    
  });

  describe('nameAndSurnameValidator', ()=>{
      test('check name and surname', ()=>{
          expect(nameAndSurnameValidator(' ').isValid).toBe(false);
      })
      test('check name and surname', ()=>{
        expect(nameAndSurnameValidator('sasadDsdsd').isValid).toBe(false);
    })
  })
  