FROM maven:3.9.6-eclipse-temurin-17 AS build
WORKDIR /app
COPY pom.xml .
RUN mvn dependency:go-offline -q
COPY src ./src
RUN mvn clean package -DskipTests -q

FROM eclipse-temurin:17-jre-alpine
WORKDIR /app
RUN addgroup -S campusconnect && adduser -S campusconnect -G campusconnect
COPY --from=build /app/target/campusconnect-backend-1.0.0.jar app.jar
RUN mkdir -p uploads/resumes && chown -R campusconnect:campusconnect /app
USER campusconnect
EXPOSE 8080
ENTRYPOINT ["java", "-Dspring.profiles.active=prod", "-jar", "app.jar"]
