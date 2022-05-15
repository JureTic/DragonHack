import speech_recognition as sr


class Speach_feelings:
    def __init__(self) -> None:
        self.feelings = ["mad", "sad", "happy", "meh", "frijevec", "ecstatic"]
        print(f"sr version: {sr.__version__}")

        self.recognizer = sr.Recognizer()


    def recognise_speech(self, audio_file):
        """ return text of a file """
        voice_file = sr.AudioFile(audio_file)
        with voice_file as source:
            self.recognizer.adjust_for_ambient_noise(source, duration=0.5)
            audio_data = self.recognizer.record(source)
        
        return self.recognizer.recognize_google(audio_data)

    def get_response(self):
        # set up the response object
        response = {
            "success": True,
            "error": None,
            "transcription": None
        }

        # try recognizing the speech in the recording
        # if a RequestError or UnknownValueError exception is caught,
        #     update the response object accordingly
        try:
            # response["transcription"] = self.recognise_speech('jackhammer.wav')
            response["transcription"] = self.recognise_speech('harvard.wav')
        except sr.RequestError:
            # API was unreachable or unresponsive
            response["success"] = False
            response["error"] = "API unavailable"
        except sr.UnknownValueError:
            # speech was unintelligible
            response["error"] = "Unable to recognize speech"

        # print(response)
        return response

    def contains_word(self, response, word):
        if word in response["transcription"]:
            print("YEAH")

    def get_all(self):
        response = self.get_response()
        self.contains_word(response, "smell")
        pass


if __name__ == "__main__":
    speak = Speach_feelings()

    speak.get_all()
