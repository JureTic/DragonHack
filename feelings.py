import speech_recognition as sr


class Speach_feelings:
    def __init__(self) -> None:
        self.feelings = ["mad", "sad", "happy", "meh", "frijevec", "ecstatic"]
        print(f"sr version: {sr.__version__}")

        self.recognizer = sr.Recognizer()
        # self.mic = sr.Microphone()


        

    def get_feeling(self):
        """ Return one of predetermind feelings. """
        pass

    def get_you_beautiful_voice(self):
        print(sr.Microphone.list_microphone_names())

        with self.mic as source:
            self.recognizer.adjust_for_ambient_noise(source, duration=0.5)
            audio = self.recognizer.listen(source)

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
            response["transcription"] = self.recognizer.recognize_google(audio)
        except sr.RequestError:
            # API was unreachable or unresponsive
            response["success"] = False
            response["error"] = "API unavailable"
        except sr.UnknownValueError:
            # speech was unintelligible
            response["error"] = "Unable to recognize speech"

        print(response)
        return response


        
    def recognise_speech(self):
        harvard = sr.AudioFile('harvard.wav')
        with harvard as source:
            self.recognizer.adjust_for_ambient_noise(source, duration=0.5)
            audio_data = self.recognizer.record(source)
        
        return self.recognizer.recognize_google(audio_data)

    def get_speech(self, audio_file):
        """ return text of a file """
        voice_file = sr.AudioFile(audio_file)
        with voice_file as source:
            self.recognizer.adjust_for_ambient_noise(source, duration=0.5)
            audio_data = self.recognizer.record(source)
        
        return self.recognizer.recognize_google(audio_data)
    
    def recognise_speech(self):
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
            response["transcription"] = self.get_speech('harvard.wav')
        except sr.RequestError:
            # API was unreachable or unresponsive
            response["success"] = False
            response["error"] = "API unavailable"
        except sr.UnknownValueError:
            # speech was unintelligible
            response["error"] = "Unable to recognize speech"

        print(response)
        return response



if __name__ == "__main__":
    speak = Speach_feelings()

    speak.recognise_speech()
