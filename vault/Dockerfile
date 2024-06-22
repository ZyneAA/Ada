FROM eclipse-temurin:22-jdk-alpine

WORKDIR /vault

COPY target/*.jar /vault/vault.jar

EXPOSE 8080

CMD ["java", "-jar", "vault.jar"]
