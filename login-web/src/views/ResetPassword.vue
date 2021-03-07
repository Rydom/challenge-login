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
        ><span style="color: #039be5">{{ title }}</span></v-card-title
      >
      <v-card-text>
        <v-row align="center" class="mx-0">
          <div class="grey--text ml-4">
            Preencha o formulário para se cadastrar
          </div>
        </v-row>
      </v-card-text>

      <v-divider class="mx-4"></v-divider>

      <v-container>
        <v-alert v-if="sucessMessage" dense text type="success">
          {{ sucessMessage }}
        </v-alert>
        <v-alert v-if="errorMessage" dense text type="error">
          {{ errorMessage }}
        </v-alert>
        <v-card-text>
          <v-form>
            <v-text-field
              class="rounded-md"
              v-model="model.email"
              color="blue darken-2"
              label="E-mail"
              required
              outlined
              placeholder="Digite o seu e-mail"
            >
            </v-text-field>
            <v-text-field
              class="rounded-md"
              v-model="model.newPassword"
              color="blue darken-2"
              label="Nova senha"
              required
              outlined
              type="password"
              placeholder="Digite a sua nova senha"
            >
            </v-text-field>
            <v-text-field
              class="rounded-md"
              v-model="model.confirmPassword"
              color="blue darken-2"
              label="Senha"
              required
              outlined
              type="password"
              placeholder="Confirme a senha"
            ></v-text-field>
          </v-form>
        </v-card-text>

        <v-card-actions class="flex-column justify-center">
          <v-btn
            class="white--text mb-3 mx-2"
            color="light-blue darken-1"
            width="100%"
            @click="resetPassword"
            elevation="2"
          >
            Redefinir
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
  name: "ResetPassword",
  data: () => {
    return {
      title: "Redefinição de senha",
      model: {
        newPassword: "",
        confirmPassword: "",
        email: "",
        password: "",
      },
      loading: false,
      sucessMessage: "",
      errorMessage: "",
      seconds: 3
    };
  },
  methods: {
    async resetPassword() {
      this.loading = true;
      await api
        .put("/reset_password", this.model)
        .then((res) => {
          this.sucessMessage = res.data.message;
          this.loading = false;
          this.clearMessage();
          this.redirect("Login");
        })
        .catch((e) => {
          this.errorMessage = e.response.data.message;
          this.loading = false;
          this.clearMessage();
        });
    },
    clearMessage() {
      if (this.sucessMessage) {
        setTimeout(() => {
          this.sucessMessage = "";
        }, this.seconds * 1000);
      } else if (this.errorMessage) {
        setTimeout(() => {
          this.errorMessage = "";
        }, this.seconds * 1000);
      }
    },
    redirect(routeName) {
      setTimeout(() => {
        this.$router.push({ name: routeName });
      }, this.seconds * 1000);
    },
  },
};
</script>


<style>
#btn-login,
#btn-cadastrar {
  margin: 0 5px;
}
</style>