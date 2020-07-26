<template>
  <div class="container">
    <div class="signin_container">
      <h1>Sign In</h1>
      <form @submit.prevent="onSubmit">
        <div class="input_field" :class="{ invalid: $v.formData.email.$error }">
          <label>Email</label>
          <input
            type="email"
            v-model.trim="formData.email"
            @blur="$v.formData.email.$touch()"
          />
          <div v-if="$v.formData.email.$error">
            <p class="error_label" v-if="!$v.formData.email.required">
              This field is required.
            </p>
            <p class="error_label" v-if="!$v.formData.email.email">
              Please enter a valid email.
            </p>
          </div>
        </div>

        <div
          class="input_field"
          :class="{ invalid: $v.formData.password.$error }"
        >
          <label>Password</label>
          <input
            type="password"
            v-model.trim="formData.password"
            @blur="$v.formData.password.$touch()"
          />
          <div v-if="$v.formData.password.$error">
            <p class="error_label" v-if="!$v.formData.password.required">
              This field is required.
            </p>
            <p class="error_label" v-if="!$v.formData.email.minLength">
              Password must be at least 6 characters.
            </p>
          </div>
        </div>

        <button type="submit">Sign In</button>
        <p class="error_label" v-if="error">Something is wrong.</p>
        <p class="error_label" v-if="authFailed">
          Please check your email and/or password.
        </p>
      </form>
    </div>
  </div>
</template>

<script>
import { required, email, minLength } from 'vuelidate/lib/validators';

export default {
  data() {
    return {
      error: false,
      formData: {
        email: '',
        password: '',
      },
    };
  },
  computed: {
    authFailed() {
      return this.$store.state.admin.authFailed;
    },
  },
  destroyed() {
    this.$store.commit('admin/authFailed', 'reset');
  },
  validations: {
    formData: {
      email: {
        required,
        email,
      },
      password: {
        required,
        minLength: minLength(6),
      },
    },
  },
  methods: {
    onSubmit() {
      if (!this.$v.$invalid) {
        this.$store.dispatch('admin/signin', this.formData);
      } else {
        this.error = true;
        setTimeout(() => {
          this.error = false;
        }, 3000);
      }
    },
  },
};
</script>

<style>
.input_field.invalid input,
.input_field.invalid select {
  border: 1px solid red;
}
</style>
