import { takeLatest, put, all, call } from 'typed-redux-saga/macro';

import { AuthError, AuthErrorCodes } from 'firebase/auth';
import { User } from 'firebase/auth';

import { USER_ACTION_TYPES } from './user.types';

import Swal from 'sweetalert2';

import {
  signInSucess,
  signInFailed,
  signUpFailed,
  signUpSuccess,
  signOutSuccess,
  signOutFailed,
  EmailSignInStart,
  SignUpStart,
  SignUpSuccess,
} from './user.action';

import {
  getCurrentUser,
  createUserDocumentFromAuth,
  signInWithGooglePopup,
  signInAuthUserWithEmailAndPassword,
  createAuthUserWithEmailAndPassword,
  signOutUser,
  AdditionalInformation,
} from '../../utils/firebase/firebase.utils';

export function* getSnapshotFromUserAuth(
  userAuth: User,
  additionalDetails?: AdditionalInformation
) {
  try {
    const userSnapshot = yield* call(
      createUserDocumentFromAuth,
      userAuth,
      additionalDetails
    );

    if (userSnapshot) {
      yield* put(signInSucess({ id: userSnapshot.id, ...userSnapshot.data() }));
    }
  } catch (error) {
    yield* put(signInFailed(error as Error));
  }
}

export function* signInWithEmail({
  payload: { email, password },
}: EmailSignInStart) {
  try {
    const userCredential = yield* call(
      signInAuthUserWithEmailAndPassword,
      email,
      password
    );

    if (userCredential) {
      const { user } = userCredential;
      yield* call(getSnapshotFromUserAuth, user);
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Login successful',
        showConfirmButton: false,
        timer: 1000,
      });
    }
  } catch (error) {
    yield* put(signInFailed(error as Error));
    switch ((error as AuthError).code) {
      case AuthErrorCodes.USER_DELETED:
        Swal.fire({
          icon: 'error',
          title: `Account with this email does not exist`,
        });
        break;
      case AuthErrorCodes.INVALID_PASSWORD:
        Swal.fire({
          icon: 'error',
          title: 'Wrong password',
        });
        break;
      default:
        Swal.fire({
          icon: 'error',
          title: 'Sign In Error',
          text: (error as AuthError).message,
        });
    }
  }
}

export function* signInWithGoogle() {
  try {
    const { user } = yield* call(signInWithGooglePopup);
    yield* call(getSnapshotFromUserAuth, user);
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Login successful',
      showConfirmButton: false,
      timer: 1000,
    });
  } catch (error) {
    yield* put(signInFailed(error as Error));
    Swal.fire({
      icon: 'error',
      title: 'Sign In Error',
      text: (error as Error).message,
    });
  }
}

export function* isUserAuthenticated() {
  try {
    const userAuth = yield* call(getCurrentUser);
    if (!userAuth) return;
    yield* call(getSnapshotFromUserAuth, userAuth);
  } catch (error) {
    yield* put(signInFailed(error as Error));
  }
}

export function* signUp({
  payload: { email, password, displayName },
}: SignUpStart) {
  try {
    const userCredential = yield* call(
      createAuthUserWithEmailAndPassword,
      email,
      password
    );

    if (userCredential) {
      const { user } = userCredential;
      yield* put(signUpSuccess(user, { displayName }));
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Sign up successful',
        showConfirmButton: false,
        timer: 1000,
      });
    }
  } catch (error) {
    yield* put(signUpFailed(error as Error));
    switch ((error as AuthError).code) {
      case AuthErrorCodes.WEAK_PASSWORD:
        Swal.fire({
          icon: 'error',
          title: 'Password should be at least 6 characters',
        });
        break;
      case AuthErrorCodes.EMAIL_EXISTS:
        Swal.fire({
          icon: 'error',
          title: 'Email already in use',
        });
        break;
      default:
        Swal.fire({
          icon: 'error',
          title: 'Sign Up Error',
          text: (error as AuthError).message,
        });
    }
  }
}

export function* signOut() {
  try {
    yield* call(signOutUser);
    yield* put(signOutSuccess());
  } catch (error) {
    yield* put(signOutFailed(error as Error));
  }
}

export function* signInAfterSignUp({
  payload: { user, additionalDetails },
}: SignUpSuccess) {
  yield* call(getSnapshotFromUserAuth, user, additionalDetails);
}

export function* onGoogleSignInStart() {
  yield* takeLatest(USER_ACTION_TYPES.GOOGLE_SIGN_IN_START, signInWithGoogle);
}

export function* onCheckUserSession() {
  yield* takeLatest(USER_ACTION_TYPES.CHECK_USER_SESSION, isUserAuthenticated);
}

export function* onEmailSignInStart() {
  yield* takeLatest(USER_ACTION_TYPES.EMAIL_SIGN_IN_START, signInWithEmail);
}

export function* onSignUpStart() {
  yield* takeLatest(USER_ACTION_TYPES.SIGN_UP_START, signUp);
}

export function* onSignUpSuccess() {
  yield* takeLatest(USER_ACTION_TYPES.SIGN_UP_SUCCESS, signInAfterSignUp);
}

export function* onSignOutStart() {
  yield* takeLatest(USER_ACTION_TYPES.SIGN_OUT_START, signOut);
}

export function* userSagas() {
  yield* all([
    call(onCheckUserSession),
    call(onGoogleSignInStart),
    call(onEmailSignInStart),
    call(onSignUpStart),
    call(onSignUpSuccess),
    call(onSignOutStart),
  ]);
}
