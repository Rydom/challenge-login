<template>
  <div class="pa-4">
    <v-card
      :loading="loading"
      class="mx-auto my-12"
      max-width="500"
      elevation="5"
      shaped
    >
      <template slot="progress">
        <v-progress-linear
          color="blue darken-2"
          height="10"
          indeterminate
        ></v-progress-linear>
      </template>

      <v-card-title style="display: block; text-align: center"
        ><span style="color: #039be5">Login</span></v-card-title
      >

      <v-card-text>
        <v-row align="center" class="mx-0">
          <div class="grey--text ml-4">Entre no site</div>
        </v-row>
      </v-card-text>

      <v-divider class="mx-4"></v-divider>

      <v-container>
        <v-alert v-if="sucessMessage" dense text type="success">
            {{sucessMessage}}
        </v-alert>
        <v-alert v-if="errorMessage" dense text type="error">
            {{errorMessage}}
        </v-alert>
        <v-card-text>
          <v-form>
            <v-text-field
              v-model="model.email"
              prepend-inner-icon="mdi-at"
              class="rounded-md"
              color="blue darken-2"
              label="E-mail"
              placeholder="Digite o seu e-mail"
              required
              outlined
            >
            </v-text-field>
            <v-text-field
              v-model="model.password"
              prepend-inner-icon="mdi-lock"
              class="rounded-md"
              color="blue darken-2"
              label="Senha"
              required
              outlined
              type="password"
              placeholder="Digite a sua senha"
              elevation="4"
            ></v-text-field>
          </v-form>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions class="flex-column justify-center">
          <v-btn
            id="btn-forgot-password"
            class="mb-2 text-caption"
            color="light-blue darken-1"
            text
            to="reset-password"
          >
            Esqueceu a senha?
          </v-btn>
          <v-btn
            id="btn-login"
            class="white--text mb-3 mx-2"
            color="light-blue darken-1"
            width="100%"
            @click="login"
            elevation="2"
            :loading="loading"
          >
            Entrar
          </v-btn>
          <v-btn
            id="btn-cadastrar"
            class="mb-3"
            color="light-green darken-1"
            outlined
            width="100%"
            to="sign-up"
          >
            Cadastre-se
          </v-btn>
          <v-divider></v-divider>
        </v-card-actions>
      </v-container>
    </v-card>
  </div>
</template>

<script>
import api from "../config/api";
export default {
  name: "Login",
  data: () => {
    return {
      model: {
        email: "",
        password: "",
      },

      loading: false,
      sucessMessage: "",
      errorMessage: "",
      seconds: 5
    };
  },
  methods: {
    async login() {
      this.loading = true;
      await api
        .post("/login", this.model)
        .then((res) => {
          this.sucessMessage = res.data.message
          this.loading = false;
          this.clearMessage();
        })
        .catch((e) => {
          this.errorMessage = e.response.data.message;
          this.loading = false;
          this.clearMessage();
        });
    },
    clearMessage() {
      if(this.sucessMessage) {
        setTimeout(()=> {
          this.sucessMessage = "";
        }, this.seconds * 1000)
      } else if(this.errorMessage) {
        setTimeout(()=> {
          this.errorMessage = "";
        }, this.seconds * 1000)
      }      
    }
  },
};
</script>


<style>
#btn-login,
#btn-cadastrar {
  margin: 0 5px;
}
</style>