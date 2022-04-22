import {
  IonCardTitle,
  IonContent,
  IonGrid,
  IonHeader,
  IonPage,
  IonRow,
  IonList,
  IonImg,
  IonToolbar,
  IonCol,
  IonButtons,
  IonBackButton,
  IonButton,
  IonIcon
} from "@ionic/react";
import { arrowBack, shapesOutline } from "ionicons/icons";

import { useEffect, useState } from "react";
import styles from "./ListItems.module.scss";

const ListItems = () => {
  const [campeonato, setCampeonato] = useState([]);

  useEffect(() => {
    async function getCampeonato() {
      try {
        const resposta = await fetch(
          "https://api.api-futebol.com.br/v1/campeonatos",
          {
            method: "GET",
            headers: {
              Authorization: "Bearer live_8f52968d02ad7d589b472cc80dcf48"
            }
          }
        );
        const resultado = await resposta.json();
        console.log(resultado);
        setCampeonato(resultado);
      } catch (error) {
        console.error(error);
      }
    }
    getCampeonato();
  }, []);

  return (
    <IonPage className={styles.homePage}>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton icon={arrowBack} text="" className="custom-back" />
          </IonButtons>

          <IonButtons slot="end">
            <IonButton className="custom-button">
              <IonIcon icon={shapesOutline} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
        <IonCardTitle className={`ion-text-center ${styles.heading}`}>
          Lista de Campeonatos
        </IonCardTitle>
      </IonHeader>
      <IonContent fullscreen>
        {campeonato.map((item) => (
          <IonList key={item.campeonato_id}>
            <IonToolbar>
              <IonGrid className={styles.grid}>
                <IonImg src={item.logo} style={{ height: "70px" }} />
                <IonRow
                  style={{ textAlign: "center", justifyContent: "center" }}
                >
                  <IonCol size="12">
                    <IonCardTitle>{item.nome}</IonCardTitle>

                    <p>{`Status: ${item.status ? item.status : "N/A"}`}</p>
                    <p>{`Rodada atual: ${
                      item.rodada_atual
                        ? `${item.rodada_atual.nome} - ${item.rodada_atual.status} (${item.tipo})`
                        : "N/A"
                    }`}</p>
                    <p>{`Fase atual: ${
                      item.fase_atual.nome ? item.fase_atual.nome : "N/A"
                    }`}</p>
                    <p>{`Temporada: ${
                      item.edicao_atual.temporada
                        ? item.edicao_atual.temporada
                        : "N/A"
                    }`}</p>
                  </IonCol>
                </IonRow>
              </IonGrid>
            </IonToolbar>
          </IonList>
        ))}
      </IonContent>
    </IonPage>
  );
};

export default ListItems;
